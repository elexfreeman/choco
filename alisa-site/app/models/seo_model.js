/*класс модели seo*/
const SiteName = 'LikeChoco';


class SeoModel {

    static Get(page) {
        return new Promise((resolve, reject) => {
            if (page === 'main') {
                resolve({
                    title: SiteName
                    , description: ''
                    , keywords: ''
                })
            } else {
                resolve({
                    title: SiteName
                    , description: ''
                    , keywords: ''
                })
            }
        });
    }

}


module.exports = SeoModel;
