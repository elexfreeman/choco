/*модуль змеения размера картики по урлу*/
const jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const Settings = require('../../settings');

const upload_path = Settings.AppPath() +"/public/images/uploadimg/";

class ImageResize {


    static async CreateFolder(folder) {
        let exist = await fs.existsSync(folder);
        if (!exist) {
            await fs.mkdirSync(folder);
        }
        return folder
    }

    static async Resize(w, filename) {

        /*путь для выхода*/
        let r_path = upload_path + w + 'w/';
        try {

            /*имя файла*/
            let name = path.parse(filename).name;
            let ext = path.parse(filename).ext;

            /*создаем паку выхода*/
            await ImageResize.CreateFolder(r_path);

            /*ресайзим*/
            const image = await jimp.read(upload_path + filename);
            await image.resize(parseInt(w), jimp.AUTO);
            await image.quality(60);

            /*записываем*/
            const out_img = r_path + name + '_x' + w + 'w' + ext;
            await  image.write(out_img);
            return out_img;
        }
        catch (e) {
            console.log(e);
        }
    }

    static async Rx128w(filename) {
        /*имя файла*/
        let size = '128';
        let name = path.parse(filename).name;
        let ext = path.parse(filename).ext;

        let r_path = upload_path + size + 'w/';

        const out_img = r_path + name + '_x' + size + 'w' + ext;

        try {
            let exist = await fs.existsSync(out_img);
            if (!exist) {
                await ImageResize.Resize(size, filename);
            }
            return '/images/uploadimg/' + size + 'w/' + name + '_x' + size + 'w' + ext;
        } catch (e) {
            return '/images/uploadimg/' + name + ext;
        }
    }

    static async Rx256w(filename) {
        /*имя файла*/
        let size = '256';
        let name = path.parse(filename).name;
        let ext = path.parse(filename).ext;

        let r_path = upload_path + size + 'w/';

        const out_img = r_path + name + '_x' + size + 'w' + ext;

        try {
            let exist = await fs.existsSync(out_img);
            if (!exist) {
                await ImageResize.Resize(size, filename);
            }
            return '/images/uploadimg/' + size + 'w/' + name + '_x' + size + 'w' + ext;
        } catch (e) {
            return '/images/uploadimg/' + name + ext;
        }
    }


    static async Rx512w(filename) {
        /*имя файла*/
        let size = '512';
        let name = path.parse(filename).name;
        let ext = path.parse(filename).ext;

        let r_path = upload_path + size + 'w/';

        const out_img = r_path + name + '_x' + size + 'w' + ext;

        try {
            let exist = await fs.existsSync(out_img);
            if (!exist) {
                await ImageResize.Resize(size, filename);
            }
            return '/images/uploadimg/' + size + 'w/' + name + '_x' + size + 'w' + ext;
        } catch (e) {
            return '/images/uploadimg/' + name + ext;
        }
    }



    static async Rx1024w(filename) {
        /*имя файла*/
        let size = '1024';
        let name = path.parse(filename).name;
        let ext = path.parse(filename).ext;

        let r_path = upload_path + size + 'w/';

        const out_img = r_path + name + '_x' + size + 'w' + ext;

        try {
            let exist = await fs.existsSync(out_img);
            if (!exist) {
                await ImageResize.Resize(size, filename);
            }
            return '/images/uploadimg/' + size + 'w/' + name + '_x' + size + 'w' + ext;
        } catch (e) {
            return '/images/uploadimg/' + name + ext;
        }
    }
}


if (module.parent) {
    module.exports = ImageResize;
} else {

   console.log(Settings.AppPath());


}