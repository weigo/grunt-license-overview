module.exports = {
    find: function () {
        var process = require('process'), fs = require('fs'), path = require('path');
        var bower = null, folders = process.cwd().split(path.sep);

        function getBowerRcFromHome() {
            var possibleUserHomes = ['HOME', 'HOMEPATH', 'USERPROFILE', 'APPDATA'].reverse(), bowerRc = null;

            while (possibleUserHomes.length > 0 && bowerRc === null) {
                bowerRc = readBowerRcFromPath(process.env[possibleUserHomes.pop()]);
            }

            return bowerRc;
        }

        function readBowerRcFromPath(folder) {
            var stat, bowerRc = folder + path.sep + '.bowerrc';

            try {
                stat = fs.statSync(bowerRc);

                if (stat.isFile()) {
                    return fs.readFileSync(bowerRc).toJSON();
                }
            }
            catch (err) {
            }

            return null;
        }

        while (bower === null && folders.length > 0) {
            bower = readBowerRcFromPath(folders.join(path.sep));
            folders.pop();
        }

        if (bower === null) {
            bower = getBowerRcFromHome();
        }

        return bower;
    }
};
