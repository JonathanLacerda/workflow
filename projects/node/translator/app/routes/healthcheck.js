/*
|--------------------------------------------------------------------------
| Healthcheck Route
|--------------------------------------------------------------------------
*/

let router = require('express').Router();
const logger = require('../utils/logger');
const edgat = require('../translator/edg-core-article-translator');

let translator = new edgat();

router.get('/healthcheck.json', (req, res) => {

    let json = {
        'UID': 'revistaquem-160911',
        'metadata': {
            'title': 'Kylie Jenner estaria gr\u00e1vida de uma menina, diz site',
            'subtitle': 'Socialite de 20 anos e Travis Scott teriam come\u00e7ado a namorar em abril deste ano',
            'authors': ['quemonline'],
            'keywords': ['article'],
            'tags': ['neymar', 'marquezine'],
            'published_in': '16/10/2017:14:09:22 +0300',
            'changed_in': '16/10/2017:17:22:09 +0300',
            'access': 'public'
        },
        'body': '<div class="foto componente_materia midia-largura-620">\r\n\t<img alt="Kylie Jenner (Foto: Reprodu\u00e7\u00e3o / Instagram)" height="466" id="585896" src="http://s2.glbimg.qa01.globoi.com/4-cJSBJt5XnVOTxQF4XPUQp0HgI=/e.glbimg.qa01.globoi.com/og/ed/f/original/2017/11/09/kj1_Vyd9I0O.jpg" title="Kylie Jenner (Foto: Reprodu\u00e7\u00e3o / Instagram)" width="620" /><label class="foto-legenda">Kylie Jenner (Foto: Reprodu&ccedil;&atilde;o / Instagram)</label></div>\r\n<p>\r\n\t&nbsp;</p>\r\n<p>\r\n\tAinda sem confirmar ou negar a gravidez, <a href="http://revistaquem.globo.com/famoso/kylie-jenner/" target="_blank">Kylie Jenner</a> continua deixando todo mundo curioso. A empres&aacute;ria de 20 anos, que estaria gr&aacute;vida do primeiro filho com <strong>Travis Scott</strong>, j&aacute; est&aacute; lidando com todos os sintomas da gesta&ccedil;&atilde;o.</p>\r\n<p>\r\n\tDe acordo com o <em>HollywoodLife</em>, Kylie est&aacute; aprendendo a lidar com enjoos matinais, desejos incontrol&aacute;veis por comidas e a mudan&ccedil;a de humor constante. &quot;Ela s&oacute; pensa e fala sobre o beb&ecirc; agora. Kylie acredita que isso &eacute; uma coisa &uacute;nica na vida, ent&atilde;o ela n&atilde;o est&aacute; ligando para o peso. Ela est&aacute; animada em ter uma menina, com todas as roupas e acess&oacute;rios que ela poder&aacute; vestir a crian&ccedil;a&quot;, disse uma fonte exclusiva do site.</p>\r\n<p>\r\n\tLEIA MAIS: <a href="http://revistaquem.globo.com/QUEM-News/noticia/2017/10/kylie-jenner-oferece-espiadinha-basica-da-barriga-em-meio-rumores-de-gravidez.html" target="_blank">KYLIE JENNER OFERECE &#39;ESPIADINHA B&Aacute;SICA&#39; DA BARRIGA EM MEIO A RUMORES DE GRAVIDEZ</a></p>\r\n<div class="foto componente_materia midia-largura-620">\r\n\t<img alt="Kylie Jenner (Foto: Reprodu\u00e7\u00e3o/Instagram)" height="466" id="586716" src="http://s2.glbimg.qa01.globoi.com/r5XOsB95NJUrXjj-_Uq8JGnNO6I=/e.glbimg.qa01.globoi.com/og/ed/f/original/2017/11/09/kj2_wySvO3y.jpg" title="Kylie Jenner (Foto: Reprodu\u00e7\u00e3o/Instagram)" width="620" /><label class="foto-legenda">Kylie Jenner (Foto: Reprodu&ccedil;&atilde;o/Instagram)</label></div>\r\n<div class="foto componente_materia midia-largura-620">\r\n\t<img alt="HOUSTON, TX - APRIL 25:  Houston rapper Travis Scott and Kylie Jenner watch courtside during Game Five of the Western Conference Quarterfinals game of the 2017 NBA Playoffs at Toyota Center on April 25, 2017 in Houston, Texas. NOTE TO USER: User expressly (Foto: Getty Images)" height="597" id="581192" src="http://s2.glbimg.qa01.globoi.com/R9ZEoZ3vp2zSohdODBFKKxkzuc0=/e.glbimg.qa01.globoi.com/og/ed/f/original/2017/11/09/kj3_sOKQQHq.jpg" title="HOUSTON, TX - APRIL 25:  Houston rapper Travis Scott and Kylie Jenner watch courtside during Game Five of the Western Conference Quarterfinals game of the 2017 NBA Playoffs at Toyota Center on April 25, 2017 in Houston, Texas. NOTE TO USER: User expressly (Foto: Getty Images)" width="620" /><label class="foto-legenda">HOUSTON, TX - APRIL 25: Houston rapper Travis Scott and Kylie Jenner watch courtside during Game Five of the Western Conference Quarterfinals game of the 2017 NBA Playoffs at Toyota Center on April 25, 2017 in Houston, Texas. NOTE TO USER: User expressly (Foto: Getty Images)</label></div>\r\n<p>\r\n\t&nbsp;</p>\r\n',
        'publications': [ ]
    };

    let startTime = Date.now();

    let makeResponseBody = (message, edgCoreStartTime, edgCoreElapsedTime) => {
        return { message, edgCoreStartTime, edgCoreElapsedTime };
    };

    let sendSuccess = () => {
        let elapsedTime = Date.now() - startTime;
        res.status(200).json(makeResponseBody('ok', startTime, elapsedTime));
    };

    let sendError = (error) => {
        let elapsedTime = Date.now() - startTime;
        logger.warn(`/healthcheck.json - warning - GET '${json}' - ${error.message} - ${error.code} - ${startTime} - ${elapsedTime}`);
        return res.status(503).json(makeResponseBody(error.message, startTime, elapsedTime));
    };

    logger.info('healthcheck gett');

    translator.load(json)
        .then(rawArticle => translator.translate(rawArticle))
        .then(sendSuccess, sendError)
        .catch(sendError);
});

module.exports = router;