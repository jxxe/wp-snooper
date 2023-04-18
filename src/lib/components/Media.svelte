<script lang="ts">
    import type { MediaEntry } from '../types';
    export let entry: MediaEntry;

    function getImage(entry: MediaEntry): string|null {
        const sizes = entry.media_details.sizes;
        if('thumbnail' in sizes) return sizes.thumbnail.source_url;
        return Object.values(sizes)[0]?.source_url ?? entry.source_url;
    }
</script>

<div class="border p-4 flex gap-4">
    <div class="border aspect-square w-24 shrink-0">
        <img class="object-contain object-center" src={getImage(entry)} alt={entry.alt_text}>
    </div>

    <div>
        <p class="break-all">{entry.title.rendered}</p>
    </div>
</div>