<script lang="ts">
    import Table from '../lib/components/Table.svelte';

    let baseUrl = '';
    let page = 1;
    let filterPdfs = false;

    let data: any[] = [];
    let filteredData: any[] = [];

    async function getUrl(path: string) {
        const url = '/proxy?url=' + encodeURIComponent(baseUrl + path);
        const request = await fetch(url);
        return await request.json();
    }

    function formatDate(utcDate: string): string {
        const date = new Date(utcDate);
        return [date.getFullYear(), date.getMonth()+1, date.getDay()]
            .map(a => String(a).padStart(2, '0')).join('-');
    }

    async function loadMedia() {
        filteredData = [];
        data = [];
        let url = '/wp-json/wp/v2/media?per_page=100&page=' + page;
        if(filterPdfs) url += '&mime_type=application%2Fpdf';
        data = await getUrl(url);

        filteredData = data.map(row => {
            if(row.type === 'image') row.source_url = row.media_details.sizes?.thumbnail?.source_url ?? row.source_url;
            row.date = formatDate(row.date);
            row.title = row.title.rendered;
            if(row.title.trim() === '') row.title = row.source_url.split('/')[row.source_url.split('/').length - 1];
            return row;
        });

        filteredData = pick(filteredData, {
            source_url: 'Image',
            title: 'Title',
            media_type: 'Type',
            date: 'Date',
        });
    }

    function pick(objects: {[key: string]: any}[], keys: {[key: string]: string}): object[] {
        let pickedObjects: object[] = [];

        for(const object of objects) {
            let pickedObject: [string, any][] = [];

            for(const key in keys) {
                const newName = keys[key];
                pickedObject.push([newName, object[key]]);
            }

            pickedObjects.push(Object.fromEntries(pickedObject));
        }

        return pickedObjects;
    }
</script>

<svelte:head>
    <title>WP_Snooper</title>
</svelte:head>

<div class="grid gap-4 grid-cols-[1fr,350px] p-4">
    <div class="space-y-4">
        <div class="flex gap-4 items-end">
            <label>
                <span class="text-sm">WordPress URL</span>
                <input class="block border py-1 px-2 outline-none focus:border-black" placeholder="https://wordpress.org" type="url" bind:value={baseUrl}>
            </label>

            <label>
                <span class="text-sm">Page</span>
                <input class="block w-14 border py-1 px-2 outline-none focus:border-black" placeholder="1" type="number" bind:value={page}>
            </label>

            <label>
                <span class="text-sm">Filters</span>
                <button class:bg-gray-200={filterPdfs} class="block border py-1 px-2 bg-gray-50 hover:border-black" on:click={() => filterPdfs = !filterPdfs}>Only PDFs</button>
            </label>

            <button class="block border py-1 px-2 bg-gray-50 hover:border-black" on:click={loadMedia}>→</button>
        </div>

        <div>
            <Table data={filteredData} imageColumns={['Image']}/>
        </div>

        {#if filteredData.length === 100}
            <button class="block border py-1 px-2 bg-gray-50 hover:border-black" on:click={() => { page++; loadMedia(); }}>Next Page →</button>
        {/if}
    </div>

    <div class="overflow-scroll border p-4">
        <pre class="text-xs">{JSON.stringify(data, null, 4)}</pre>    
    </div>
</div>