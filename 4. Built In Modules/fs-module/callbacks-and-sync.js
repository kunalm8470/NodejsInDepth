const fs = require('fs');

const testFilePath = `${__dirname}\\test.txt`;

const testCopyFilePath = `${__dirname}\\test-copy.txt`;

const options = {
    encoding: 'utf-8'
};

/*
    fs.readFile will read entire file into the RAM
    provided the file path and encoding
*/
// --- Callback way ---
fs.readFile(testFilePath, options, (err, data) => {
    if (err) {
        console.error('Unable to read entire file', err.message);
        return false;
    }

    console.log(data);
});

// --- Synchronous way ---
const testFileData = fs.readFileSync(testFilePath, options);


fs.open(testFilePath, (err, fd) => {
    if (err) {
        console.error('Unable to open the file', err.message);
        return false;
    }

    /*
        If nothing is recieved, fs.read will try to
        allocate a buffer of 16 KB
    */
    const buf = Buffer.alloc(4096); // Create a empty buffer with 4 KB size

    const offset = 0;
    const length = buf.byteLength;
    const position = 0;

    /*
        fs.read will exactly the buffer passed, making it an efficient read
    */
    // Read 4 KB at a time
    fs.read(fd, buf, offset, length, position, (err, bytesRead, buff) => {
        if (err) {
            console.error('Unable to read the file', err.message);
            return false;
        }

        console.log('--------' + buff.toString('utf-8') + '\n' + '--------');
    });
});

/* 
    * To know the names of the file in a directory we use fs.readdir
*/
fs.readdir(`${__dirname}\\test`, (err, files) => {
    if (err) {
        console.error('Error in reading the files in a directory', err.message);
        return false;
    }

    console.log(files);
});


/* 
    To open a flag we use the fs.open function
        fs.open flags

        r - Open the file in read mode
        r+ - Open the file in read and write mode
        rs+ - Open the file for reading in synchronous way
        w - Open the file in write mode
        wx - Open the file in write mode and assert file exists
        a - Open the file in append mode (i.e will append at the end)
        a+ - Open the file in append and read mode
        ax+ - Open the file in append and read mode and assert file exists
*/
// Example open the file in read mode
fs.open(`${__dirname}\\test\\1.txt`, 'r', function (err, fd) {
    if (err) {
        console.error('Error in opening the file', err.message);
        return false;
    }

    console.log('File opened');

    /*
        * Close the file if you have opened it
        * Else it will add memory leaks
    */
    fs.close(fd, function () {
        console.log('File closed');
    });
});


/*
    Efficient way to read and write large files
    is to create a read stream first and pipe its
    content to the write stream.
*/
fs.createReadStream(testFilePath).pipe(fs.createWriteStream(testCopyFilePath));

/*
    * We can inspect the changes in a file or directory using fs.watch function
*/
fs.watch(`${__dirname}\\test\\1.txt`, function (eventType, filename) {
    console.log(`${filename} got changed due to ${eventType}`);
});


const data = [
    {
        name: 'A',
        item: 'ITM0001'
    },
    {
        name: 'B',
        item: 'ITM0002'
    },
    {
        name: 'C',
        item: 'ITM0003'
    },
    {
        name: 'D',
        item: 'ITM0004'
    }
];

/* 
    * fs.writeFile will overwrite the entire file with the new content
    * and it will create the file also if it doesn't exist
*/
fs.writeFile(`${__dirname}\\data.json`, JSON.stringify(data, null, 4), {
    encoding: 'utf-8'
}, function (err) {
    if (err) {
        console.error('Writing to file failed because', err.message);
        return false;
    }

    console.log('Writing to file successful!');
});

/*
    fs.write will write exactly a buffer to the file.
*/
fs.open(`${__dirname}\\data-fs-write.txt`, 'w', function (err, fd) {
    if (err) {
        console.error('Error in opening the file', err.message);
        return false;
    }

    const buf = Buffer.from('Hello world from fs.file');

    fs.write(fd, buf, function (err, writtenBytes, buff) {
        if (err) {
            console.error('Error in writing buffer to the file', err.message);
            return false;
        }

        console.log('Successfully written to file');
    });
});

/*
    // To rename the file we use the fs.rename function

    const oldRenamePath = `${__dirname}\\data.txt`;
    const newRenamePath = `${__dirname}\\data-renamed.txt`;

    // Rename synchronously using
    // fs.renameSync(oldRenamePath, newRenamePath);

    fs.rename(oldRenamePath, newRenamePath, function (err) {
        if (err) {
            console.error('Rename failed', err);
        }
    });
*/

/*
    We can truncate a file by length number of bytes using fs.truncate
*/
const fileToTruncatePath = `${__dirname}\\test-copy.txt`;

const bytesToTruncate = 10;

fs.truncate(fileToTruncatePath, bytesToTruncate, function (err) {
    if (err) {
        console.error('Truncating failed due to', err.message);
        return false;
    }

    console.log('Truncating file successful!');
});

/*
    * We can create hard link of a file by using fs.link function
*/
const filePathToHardLink = `${__dirname}\\test-copy.txt`;

const hardLinkFilePath = `${__dirname}\\test-copy-hard-link.txt`;

fs.link(filePathToHardLink, hardLinkFilePath, function (err) {
    if (err) {
        console.error('Hard link creation failed due to', err.message);
        return false;
    }

    console.log('Hard link created');
});

/*
    * We can create a symbolic link of a file by using fs.symlink function
    * In Windows we need admin access to create symlinks via Node.js
*/
const filePathToSymLink = `${__dirname}\\test-copy.txt`;
const symLinkFilePath = `${__dirname}\\test-copy-sym-link.txt`;
fs.symlink(filePathToSymLink, symLinkFilePath, function (err) {
    if (err) {
        console.error('Symbolic link creation failed due to', err.message);
        return false;
    }

    console.log('Symbolic link created');
});

/*
    * We can delete a file permanently by using fs.unlink function

    * In Windows, it deletes the file permanently, it won't be available in Recycle bin
    * i.e file cannot be recovered once its deleted
*/
const filePathNeedToBeDeleted = `C:\\Work\\Node.js\\4. Built In Modules\\fs-module\\test-copy-hard-link.txt`;
fs.unlink(filePathNeedToBeDeleted, function (err) {
    if (err) {
        console.error('Deleting file failed due to', err.message);
        return false;
    }

    console.log('File deleted');
});

/*
    * We can make a new directory using fs.mkdir
*/
const newDirectoryPath = `C:\\Work\\Node.js\\4. Built In Modules\\fs-module\\New Directory`;
fs.mkdir(newDirectoryPath, function (err) {
    if (err) {
        console.error('Creating the directory failed due to', err.message);
        return false;
    }

    console.log('Directory created');
});

/*
    * We can delete a directory using fs.rmdir
*/
fs.rmdir(newDirectoryPath, function (err) {
    if (err) {
        console.error('Deleting the directory failed due to', err.message);
        return false;
    }

    console.log('Directory deleted');
});

/*
    We can change the ownership of a file by using fs.chown
    by passing userId and groupId obtained from unix command id

    fs.chown('path', userId, groupId, function(err) {
        if (err) {
            console.error('File ownership change failed due to', err.message);
            return false;
        }

        console.log('File ownership changed');
    });
*/

/*
    We can get the absolute path of a file, when we pass a relative path
    using fs.realpath function
*/
fs.realpath(`${__dirname}\\test.txt`, function (err, resolvedPath) {
    if (err) {
        console.error('Fetching the absolute path of the file failed due to', err.message);
        return false;
    }

    console.log('Absolute path of the file', resolvedPath);
});

/*
    We can get the metadata of the file by reading inode table in unix like OS'es (MacOS, Linux)
    or Master Table (Windows)
*/
fs.stat(`${__dirname}\\test-copy.txt`, function (err, stats) {
    if (err) {
        console.error('Getting the stats of file failed due to', err.message);
        return false;
    }

    console.log('Stats object', JSON.stringify(stats, null, 4));

    console.log("Whether its a folder ? ", stats.isDirectory());
    console.log("Whether its a file ? ", stats.isFile());
    console.log("Whether its a FIFO ?", stats.isFIFO());
});

debugger;