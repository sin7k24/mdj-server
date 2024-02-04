const initialize = () => {
    let rootDir = '';
    switch(process.platform) {
        case 'win32': 
            rootDir = 'C://tmp/md/diary';
            break;
        case 'darwin':
            rootDir = '/Users/nakanishishingo/src/md/diary';
            break;
    }
    return rootDir;
} 

module.exports.DIARY_ROOT = initialize();