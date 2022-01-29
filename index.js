const cheerio = require('cheerio')

hexo.extend.filter.register('after_post_render', function (data) {
    let config = hexo.config
    if (config.post_asset_folder) {
        let $ = cheerio.load(data.content)
        $('img').each(function(){
            let src = $(this).attr('src').replace('\\', '/')
            if (src && src.startsWith('./')) {
                let replaced = src.substr(2)
                $(this).attr(
                    'src',
                    replaced.substr(replaced.search('/') + 1)
                )
            }
        });
        data.content = $.html();
    }
});
