// plugins/no-attr.js
export default function noAttr(options = {}) {
    return {
        name: 'no-attr',
        transformIndexHtml(html) {
            if (options.crossorigin || options.typeModule) {
                let result = html;
                
                if (options.crossorigin) {
                    result = result.replace(
                        /<script(.*?)>/g,
                        (match, attributes) => {
                            if (!attributes.includes('crossorigin') && attributes.includes('src')) {
                                return `<script${attributes} crossorigin>`;
                            }
                            return match;
                        }
                    );
                }
                
                if (options.typeModule) {
                    result = result.replace(
                        /<script(.*?)>/g,
                        (match, attributes) => {
                            if (!attributes.includes('type=') && attributes.includes('src')) {
                                return `<script${attributes} type="module">`;
                            }
                            return match;
                        }
                    );
                }
                
                return result;
            }
            return html;
        }
    };
}