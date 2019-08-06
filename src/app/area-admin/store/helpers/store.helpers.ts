
export function idFromHref(href: string) {
    if(href) {
        const splitter: string[] = href.split('/');
        return splitter[splitter.length - 1];
    }
    return null;
}
