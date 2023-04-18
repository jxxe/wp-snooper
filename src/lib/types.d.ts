type RenderedHtml = {
    rendered: string
};

type MediaSize = {
    file: string,
    width: number,
    height: number,
    filesize: number,
    mime_type: string,
    source_url: string
};

type _Links = {
    self: { href: string }[],
    collection: { href: string }[],
    about: { href: string }[],
    author: { embeddable: boolean, href: string }[],
    replies: { embeddable: boolean, href: string }[],

};

export type MediaEntry = {
    id: number,
    date: string,
    date_gmt: string,
    guid: RenderedHtml,
    modified: string,
    modified_gmt: string,
    slug: string,
    status: string,
    type: string,
    link: string,
    title: RenderedHtml,
    author: number,
    comment_status: string,
    ping_status: string,
    template: string,
    meta: any[],
    jetpack_shortlink: string?,
    description: RenderedHtml,
    caption: RenderedHtml,
    alt_text: string,
    media_type: string,
    mime_type: string,
    media_details: {
        width: number,
        height: number,
        file: string,
        filesize: number,
        sizes: { [key: string]: MediaSize }
        image_meta: object,
    },
    post: number,
    source_url: string,
    _links: _Links
}