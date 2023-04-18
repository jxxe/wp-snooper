<script lang="ts">
    export let data: object[];
    export let imageColumns: string[] = [];
</script>

{#if data.length > 0}
    <table class="w-full text-left overflow-scroll">
        <thead>
            <tr>
                {#each Object.keys(data[0]) as column}
                    <th class="text-sm px-2 py-1">{column}</th>
                {/each}
            </tr>
        </thead>

        <tbody>
            {#each data as row}
                <tr class="even:bg-gray-100">
                    {#each Object.entries(row) as [column, cell]}
                        <td class="border px-2 py-1">
                            {#if typeof cell === 'object'}
                                <pre class="break-all">{JSON.stringify(cell)}</pre>
                            {:else}
                                {#if imageColumns.includes(column)}
                                    <a href={cell} target="_blank" class="block w-12 h-12 border">
                                        <img on:error={e => e.target.src = 'https://img.icons8.com/ios/128/file.png'} class="object-contain object-center w-full h-full" src={cell} alt="">
                                    </a>
                                {:else}
                                    {cell}
                                {/if}
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
{/if}