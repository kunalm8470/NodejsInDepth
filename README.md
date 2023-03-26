# Learning Node.js in Depth by Examples

1. **Node.js overview**
    - History and Backstory
    - Overview
    - Node.js REPL (Read, Eval, Print and Loop)
    - Internals (`libuv` and `V8`)
    - Event Loop and its phases
        - Expired Timer Callbacks
        - I/O polling and Callbacks
        - `setImmediate` Callbacks
        - Close Callbacks
    - Versioning Strategy
        - Odd numbered releases
        - Even numbered releases
        - Maintainence LTS
        - Active LTS

2. **Modules**
    - Node.js globals
        - `global` The globalThis object
        - Get path of current executing file using `__filename` (unavailable in REPL mode)
        - Get path of root directory of the current executing file using `__dirname` (unavailable in REPL mode)
    - Common.JS modules
        - `require` function
        - Reference to the current active module `module`
        - Shortcut Reference to `module.exports` - `exports`
        - Identifying a module using `module.id`
        - Getting fully resolved filename for a module `module.filename`
        - Check if module is loaded compeletely `module.loaded`
        - The module which required the current module `module.parent`
        - The modules required by the current module `module.children`
    - ES6 modules
        - `import` and `export` keywords
        - Default exports
        - Named exports
        - Wildcard exports
        - `.mjs` extension

3. **Package management**
    - `package.json` file
        - Specifying description in `description` key
        - Specifying a semantic version while publishing a package (`version` key)
        - Keywords associated to the pacakage when searching via `npm search`
        - Specifying home page URL of the package for more information `homepage`
        - Specifying known issues in bugs section
        - Specifying the type of license used in `license` key
        - Specifying author metadata using `name`, `email` and `url` fields
        - Specifying main dependencies in `dependencies`
        - Specifying optional dependencies in `devDependencies`
    - `package-lock.json` file
    - `node_modules` directory
    - `npm` (Node Package Manager)
        - [NPM public registry](https://registry.npmjs.org/)
        - Scaffolding `package.json` file using `npm init` script
        - Installing packages (`npm install <package_name>`)
        - Installing packages as a main or a dev dependency.
        - NPM scripts
            - Running a script using `npm run`
            - Executing multiple scripts
                - Executing multiple scripts sequentially (`&&`)
                - Executing multiple scripts parallely UNIX only (`&`)
            - Error handling
                - Run scripts silently `npm run <script> --silent`
                - Log levels in error handling
                    - `-s` or `--silent` or `--loglevel silent`
                    - `-q` or `--quiet` or `--loglevel warn`
                    - `-d` or `--loglevel info`
                    - `-dd` or `--verbose` or `--loglevel verbose`
                    - `-ddd` or `--loglevel silly`
            - Referencing scripts from files
            - `pre` and `post` for scripts
            - Access environment variables
            - Group scripts using colon `:` (E.g: `start:dev` or `start:prod`)
    - `yarn`
        - Scaffolding `package.json` file using `yarn init` script

4. **Built-in Node.js modules**
    - **console module**
        - Print to `stdout` with newline `console.log` or `console.info`
        - Print to `stderr` with newline `console.error` or `console.warn`
        - Show object and hidden properties using `console.dir`
        - Start a timer using `console.time`
        - End a timer using `console.timerEnd`
        - Print a stack trace of the current executing file to the root `console.trace`

    - **util module**
        - Returns a formatted string similar to `printf-like` format `util.format(format, [...]);`
        - Print message with timestamp on stdout. `util.log(string);`
        - Print message to stderr `util.error(string);`
        - Check if an object is an array `util.isArray(object);`
        - Check if an object is an regex `util.isRegExp(object);`
        - Check if an object is an date `util.isDate(object);`
        - Check if an object is an error `util.isError(object);`
        - Wrap a callback function in a promise-constructor `util.promisify(fn);`
        - Convert a function returning promise to a callback `util.callbackify(fn);`

    - **Timers**
        - To schedule execution of a one-time callback function after delay milliseconds - `setTimeout(callback, delay, [arg], [...]);`
        - Stop a timer that was previously created with setTimeout() - `clearTimeout(timerId);`
        - To schedule the repeated execution of a callback function every delay milliseconds - `setInterval(callback, delay, [arg], [...]);`
        - Stop a timer that was previously created with setInterval() - `clearInterval(timerId)`
        - To schedule the "immediate" execution of a callback function after I/O events callbacks and before setTimeout and setInterval - `setImmediate(callback, [arg], [...]);`
        - Stop a timer that was previously created with setImmediate() - `clearImmediate(immediateObject);`

    - **buffer module**
        - Create a new buffer by using following parameterized constructors
            - Allocate a new buffer of size octets `Buffer.alloc(size);`
            - Allocate a new buffer using an array of octets `Buffer.from(array);`
            - Allocate a new buffer containing the given str. encoding defaults to 'utf8' - `Buffer.from(str, [encoding]);`
        - Validate the encoding of a buffer by passing an encoding parameter `Buffer.isEncoding(encoding);`
        - Test if an object is a Buffer `Buffer.isBuffer(obj);`
        - Concatenating all the buffers in the array together. `Buffer.concat(list, [totalLength]);`
        - Calculate the actual byte length of a string `Buffer.byteLength(string, [encoding]);`
        - Write a string to the buffer at offset using the given encoding `buf.write(string, [offset], [length], [encoding]);`
        - Return and decode a string from buffer data encoded with encoding (defaults to 'utf8') beginning at start (defaults to 0) and ending at end (defaults to buffer.length). `buf.toString([encoding], [start], [end]);`
        - Return a JSON-representation of the Buffer instance `buf.toJSON();`
        - Perform a copy between source and target buffers `buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd]);`
        - Return a new buffer by referencing memory from the old buffer `buf.slice([start], [end]);`
        - Fill the buffer with the specified value `buf.fill(value, [offset], [end]);`
        - Get and set the octet at index `buf[index];`
        - Calculate the size of the buffer in bytes `buf.length;`

    - **File System module (fs) and (fs/promises)**
        - Write operations
            - Asynchronously write data to file `fs.writeFile(filename, data, [options], callback);` and `fs.writeFile(filename, data, [options]);`
            - Synchronously write data to file `fs.writeFileSync(filename, data, [options]);`
            - Asynchronously write buffer to the file `fs.write(fd, buffer, offset, length, position, callback);` and `fs.write(fd, buffer, offset, length, position);`
            - Synchronously write buffer to the file `fs.writeSync(fd, buffer, offset, length, position);`
            - Asynchronously append data to a file `fs.appendFile(filename, data, [options], callback);` and `fs.appendFile(filename, data, [options]);`
            - Synchronously append data to a file `fs.appendFileSync(filename, data, [options]);`
            - Open the file as a write stream `fs.createWriteStream(path, [options]);`

        - Read operations
            - Asynchronously read the entire contents of a file `fs.readFile(filename, [options], callback);` and `fs.readFile(filename, [options]);`
            - Synchronously read the entire contents of a file `fs.readFileSync(filename, [options]);`
            - Asynchronously read buffer data from the file specified by fd `fs.read(fd, buffer, offset, length, position, callback);` and `fs.read(fd, buffer, offset, length, position);`
            - Synchronously read buffer data from the file specified by fd `fs.readSync(fd, buffer, offset, length, position);`
            - Asynchronously get the file names in a directory as an array of strings `fs.readdir(path, callback);` and `fs.readdir(path);`
            - Synchronously get the file names in a directory as an array of strings `fs.readdirSync(path);`
            - Open the file as a read stream `fs.createReadStream(path, [options]);`
            - Watch for changes on a file or a directory `fs.watch(filename, [options], [listener]);`
            - Asynchronously verify whether a absolute file path exists on the file system or not `fs.exists(path, callback);` and `fs.exists(path);`
            - Synchronously verify whether a absolute file path exists on the file system or not `fs.existsSync(path);`
            - Asynchronously open a file `fs.open(path, flags, [mode], callback);` and `fs.open(path, flags, [mode]);`
            - Synchronously open a file `fs.openSync(path, flags, [mode]);`
            - Asynchronously close a file by specified `fd` - `fs.close(fd, callback);` and `fs.close(fd);`
            - Synchronously close a file by specified `fd` - `fs.closeSync(fd);`

        - Maintainence operations
            - Asynchronously rename a file `fs.rename(oldPath, newPath, callback);` and `fs.rename(oldPath, newPath);`
            - Synchronously rename a file  `fs.renameSync(oldPath, newPath);`
            - Asynchronously shrink the file by a specified size using `fs.truncate(path, len, callback);` and `fs.truncate(path, len);`
            - Synchronously shrink the file by a specified size using `fs.truncateSync(path, len);`
            - Asynchronously create a hard link to the given path `fs.link(srcpath, dstpath, callback);` and `fs.link(srcpath, dstpath);`
            - Synchronously create a hard link to the given path `fs.linkSync(srcpath, dstpath);`
            - Asynchronously create a symlink to the specified path `fs.symlink(srcpath, dstpath, [type], callback);` and `fs.symlink(srcpath, dstpath, [type]);`
            - Synchronously create a symlink to the specified path `fs.symlinkSync(srcpath, dstpath, [type]);`
            - Asynchronously delete a file or a symlink using `fs.unlink(path, callback);` and `fs.unlink(path);`
            - Synchronously delete a file or a symlink using `fs.unlinkSync(path);`
            - Asynchronously create a directory using `fs.mkdir(path, [mode], callback);` and `fs.mkdir(path, [mode]);`
            - Synchronously create a directory using `fs.mkdirSync(path, [mode]);`
            - Asynchronously delete a directory and its contents using `fs.rmdir(path, callback);` or `fs.rmdir(path);`
            - Synchronously delete a directory and its contents using `fs.rmdirSync(path);`
            - Asynchronously change owner and group of a file provided (uid) and (gid) `fs.chown(path, uid, gid, callback);` and `fs.chown(path, uid, gid);`
            - Synchronously change owner and group of a file provided (uid) and (gid) `fs.chownSync(path, uid, gid);`
            - Asynchronously change owner and group of a file provided (uid) and (gid) (Does not change for symlinks) `fs.lchown(path, uid, gid, callback);` and `fs.chown(path, uid, gid);`
            - Synchronously change owner and group of a file provided (uid) and (gid) (Does not change for symlinks) `fs.lchownSync(path, uid, gid);`

        - Miscellaneous operations
            - Asynchronously read a symlink using `fs.readlink(path, callback);` and `fs.readlink(path);`
            - Synchronously read a symlink using `fs.readlinkSync(path);`
            - Asynchronously find the absolute path of a file `fs.realpath(path, [cache], callback);` and `fs.realpath(path, [cache]);`
            - Synchronously find the absolute path of a file `fs.realpathSync(path, [cache]);`
            - Asynchronously find metadata about a file using `fs.stat(path, callback);` and `fs.stat(path);`
            - Synchronously find metadata about a file using `fs.statSync(path);`
                - `stats.isFile();`
                - `stats.isDirectory();`
                - `stats.isBlockDevice();`
                - `stats.isCharacterDevice();`
                - `stats.isSymbolicLink();`
                - `stats.isFIFO();`
                - `stats.isSocket();`

    - **events module**
        - Access the EventEmitter class by `require('events').EventEmitter`
        - Fire a custom event with desired arguments `emitter.emit(event, [arg1], [arg2], [...]);`
        - Listen to a custom event by using `emitter.addListener(event, listener);` or `emitter.on(event, listener);`
        - Listen to a custom event only once by using `emitter.once(event, listener);`
        - Remove a listener callback function for a particular custom event `emitter.removeListener(event, listener);`
        - Remove all listener for a particular custom event `emitter.removeAllListeners([event]);`
        - Provide an upper bound for listener callback functions on a custom event `emitter.setMaxListeners(n);`
        - Get an array of all listener callback functions for a custom event `emitter.listeners(event);`
        - Get total number of listener callback functions for a custom event `EventEmitter.listenerCount(emitter, event);`

    - **process module**
        - Access standard output `process.stdout;`
        - Access standard input `process.stdin;`
        - Access standard error `process.stderr;`
        - Get the command line arguments passed to a Node.js script as an array `process.argv;`
        - Get the environment variables as a JavaScript object `process.env;`
        - Get the absolute path of the executable that started the current process `process.execPath;`
        - Get the command line arguments of the executable that started the current process `process.execArgv;`
        - Get the processor architecture of the current computer `process.arch;` (`x64`, `arm`, `ia32`)
        - Get the configuration options used to compile the current Node.js executable as a JavaScript object `process.config;`
        - Get the operating system (OS) which the the current Node.js executable is running on `process.platform;`
        - Get the ProcessId (PID) of a process `process.pid;`
        - Getter/Setter to change the title of a process displayed in the linux `ps` command `process.title;`
        - Get the currently installed Node.js version (`NODE_VERSION`) `process.version;`
        - Get a JavaScript object of the inbuilt dependencies by Node.js `process.versions;`
        - Exit the current process abruptly and generate a core file `process.abort();`
        - Exit the current process with a return code `process.exit([code]);`
        - Send a kill signal to the process `process.kill(pid, [signal]);`
        - Change the current directory of a process `process.chdir(dir);`
        - Get the current directory of a process `process.cwd();`
        - Get or set the group identity of a process `process.getgid();` and `process.setgid(id);`
        - Get or set the user identity of a process `process.getuid();` and `process.setuid(id);`
        - Get or set the supplementary group ids `process.getgroups();` and `process.setgroups(grps);`
        - Gets the `/etc/group` and initializes the group access list, using all groups of which the user is a member `process.initgroups(user, extra_grp);`
        - Get a JavaScript object describing the memory usage of the Node process measured in bytes. `process.memoryUsage();`
        - Invoke a callback on the next loop around the event loop `process.nextTick(callback);`
        - Get the number of seconds a process is running `process.uptime();`
        - Get the current high-resolution real time in a [seconds, nanoseconds] tuple Array. `process.hrtime();`
        - Listen to exit event, when the process is about to exit `process.on('exit', function(code) {});`
        - Listen to an unhandled exception which bubbles all the way back to the event loop `process.on('uncaughtException', function(err, origin) {});`
        - Listen to an unhandled promise rejection which bubbles all the way back to the event loop `process.on('unhandledRejection', function(reason, promise) {});`

    - **child_process module**
        - Access the child process's stdin `child.stdin;`
        - Access the child process's stdout `child.stdout;`
        - Access the child process's stderr `child.stderr;`
        - Get the ProcessId (PID) of a child process `child.pid;`
        - Check if child process is able to send messages `child.connected;`
        - Runs a command in a shell and buffers the output `child_process.exec`
        - Synchronously runs a command in a shell and buffers the output `child_process.execSync`
        - Runs a command in a shell and buffers the output but without a spawning a shell. `child_process.execFile()`
        - Spawn a new Node.js process and invoke a specified module with an IPC communication `child_process.fork()`
        - Send a kill signal to the child process `child.kill([signal]);`
        - Gracefully close the IPC channel between parent and child `child.disconnect();`

    - **os module**
        - Get the absolute path of the operating system's default directory for temp files. `os.tmpdir();`
        - Check if the processor is Big-Endian or Little-Endian `os.endianness();` Returns `BE` or `LE`
        - Get the hostname of the operating system. `os.hostname();`
        - Get the operating system name `os.type();`
        - Get the operating system platform `os.platform();`
        - Get the operating system CPU architecture `os.arch();`
        - Get the operating system release `os.release();`
        - Get the system uptime in seconds. `os.uptime();`
        - Get the total amount of system memory in bytes `os.totalmem();`
        - Get the amount of free system memory in bytes. `os.freemem();`
        - Get the metadata about the processor installed `os.cpus();`
        - Get the list of all Network Interface Cards (NICs) installed in the computer `os.networkInterfaces();`
        - Get the line ending of the current operating system `os.EOL;`

    - **path module**
        - Normalize a string path, taking care of '..' and '.' parts `path.normalize(p);`
        - Join all the arguments together and normalize the resulting path. `path.join([path1], [path2], [...]);`
        - Resolves the 'to' path to an absolute path. `path.resolve([from ...], to);`
        - Solve the relative path from 'from' path to 'to' path. `path.relative(from, to);`
        - Return the directory name of a path. Similar to the UNIX dirname command. `path.dirname(p);`
        - Extract the filename from a file path `path.basename(p, [ext]);`
        - Extract the extension from a file path `path.extname(p);`
        - Get the platform-specific file separator. `'\\'` (Windows) or `'/'` (UNIX) `path.sep;`
        - Get the platform-specific path delimiter, `';'` (Windows) or `':'` (UNIX) `path.delimiter;`

    - **stream module**
        - Create writeable streams
        - Create readable streams
        - Create duplex streams
        - Create transform streams

    - **crypto module**
        - Generate pseudo-random buffer `crypto.randomBytes(size[, callback])`
        - Generate a random integer n such that `min <= n < max` `crypto.randomInt([min, ]max[, callback])`
        - Generate a random UUIDv4 `crypto.randomUUID([options])`
        - Create hashes
            - [`MD5`, `SHA256`, `SHA384`, `SHA512`] `crypto.createHash(algorithm[, options])`
            - pbkdf2 `crypto.pbkdf2(secret, salt, iterations, keyLength, hashingAlgorithm, (err, derivedKey) => {`
            - Create salt and hash using [`bcrypt npm module`](https://www.npmjs.com/package/bcrypt)

        - Symmetric key encryption
            - Create encrypted cipher object using AES-256-GCM algorithm `crypto.createCipheriv(algorithm, key, iv, options);`
            - Create decrypted cipher object using AES-256-GCM algorithm `crypto.createDecipheriv(algorithm, key, iv, options);`

        - Asymmetric key encryption
            - Generate `RSA 2048/4096/7168/15360 bit public-private key pair` using OpenSSL in `.key` files.
            - Encrypt a plain text string using `crypto.publicEncrypt(publicKey, buffer);`
            - Decrypt a encrypted buffer using `crypto.privateDecrypt({ key: 'publickey', passphrase: '' }, buffer)`
            - Sign and Verify a JWT token using [`jsonwebtoken npm module`](https://github.com/auth0/node-jsonwebtoken) using the RSA keys generated previously.

        - Digital Signatures using Elliptic Curve Cryptography
            - Generate `ECDSA NIST P-256/NIST P-384/NIST P-512/ed25519 bit public-private key pair` using OpenSSL in `PEM` format.
            - Sign a plain text string using `crypto.createSign('Digest algorithm name')` and `sign.sign(privateKeyBuffer).toString('hex')`
            - Verify the signature using `crypto.createVerify('Digest algorithm name')` and `verifyObj.verify(publicKeyBuffer, signature, 'hex');`
            - Sign and Verify a JWT token using [`jsonwebtoken npm module`](https://github.com/auth0/node-jsonwebtoken) using the ECDSA keys generated previously.

    - **zlib module**
        - Create compressed gzip buffer `zlib.gzip(data, (err, compressed) => {`
        - Get original decompressed buffer back `zlib.unzip(compressed, (err, decompressed) => {`

    - **url module**
        - Return a JavaScript object of the input URL string `url.parse(urlStr, [parseQueryString], [slashesDenoteHost]);`
        - Return a URL string by taking input a JavaScript object `url.format(urlObj);`
        - Take a base URL, and a href URL, and resolve them. `url.resolve(from, to);`

    - **querystring module**
        - Serialize a query string by taking input a JavaScript object (Optionally override the default separator ('&') and assignment ('=') characters.) `querystring.stringify(obj, [sep], [eq]);`
        - Deserialize a query string to a JavaScript object. (Optionally override the default separator ('&') and assignment ('=') characters.) `querystring.parse(str, [sep], [eq], [options]);`

    - **dns module**
        - Get the IPv4 address of the specified hostname using the DNS protocol `dns.resolve4('HOSTNAME', (err, ips) => {`
        - Get the mail exchange of the specified hostname using the DNS protocol `dns.resolveMx('HOSTNAME', (err, mx) => {`
        - Get the text queries records of the specified hostname using DNS protocol `dns.resolveTxt('HOSTNAME', (err, txt) => {`

    - **http and https module**
        - Create basic REST API using `http` module
        - Create basic REST API using `https` module and secure it with self signed certificate.

5. **Express.js**
    - Overview and Installation
    - Hello world API
    - Routing
    - Middlewares
    - Error Handling
    - Static files
    - CORS
    - Cookies
    - Templating using EJS
    - Request object
        - Reference to the Express.js application object using `req.app`
        - Get the base URL where the route was mounted `req.baseurl`
        - Get the request body as a JavaScript object `req.body`
        - Get the cookies sent in the request as a JavaScript object `req.cookies`
        - Determine if a request is "stale" or not `req.stale`
        - Determine if a request is "fresh" or not `req.fresh`
        - Get the hostname from the 'host' header `req.hostname`
        - Get the IP address of the request `req.ip`
        - Get the list of IP addresses if through request header 'X-Forwarded-For' `req.ips`
        - Get the original request URL `req.originalurl`
        - Get the route parameters as a JavaScript object `req.params`
        - Get the current route path `req.path`
        - Get the request scheme (HTTP/HTTPS) `req.protocol`
        - Get the query parameters as a JavaScript object `req.query`
        - Determine if a secure TLS connection is established `req.secure`
        - Determine if the current request was issued by a library by setting the 'x-requested-with' request header `req.xhr`
        - Check if a MIME type is acceptable or not `req.accepts(type);`
        - Retrieve any request header by name `req.get('header');`
        - Check if incoming request's Content-Type matches the specified parameter `req.is(type);`
        - Retrieve any named route or query parameter `req.param(name [,defaultValue]);`
    - Response object
        - Reference to the Express.js application object using `res.app`
        - Attach properties to the response object `res.locals`
        - Append headers to the response body `res.append(field [, value]);`
        - Set the location header `res.location(path);`
        - Send cookies from server side in response body `res.cookie(name, value [, options]);`
        - Remove cookie from the response body `res.clearCookie(name [, options]);`
        - Transfer the file as an attachment `res.download(path [, filename] [, fn]);`
        - Send file as attachment `res.attachment([filename]);`
        - End the response process `res.end([data] [, encoding]);`
        - Return a particular HTTP status code as response `res.status(<HTTP status code>);`
        - Return a JavaScript object as a JSON string in the response body `res.json([body]);`
        - Issue a HTTP 302 Permanent Redirect in the response body `res.redirect([status,] path);`
        - Render a HTML view to display to the client browser `res.render(view [, locals] [, callback]);`
        - Send a file from the server's disk by its filepath `res.sendFile(path [, options] [, fn]);`
        - Send arbitrary data without worrying its type `res.send(object);`

6. **Case Study 1: Uploading files**
    - Upload file using `multer` module
    - Store uploaded file in Azure Blob Storage
    - Show uploaded file using EJS templating

7. **Case Study 2: Generate Excel files**
    - Generate Excel file report

8. **Case Study 3: CRUD API using Postgres without ORM**
    - Perform request validation using `ajv` module
    - Create CRUD API using `pg` module and provide following endpoints:
        - **Offset pagination** `/api/employees?page=1&limit=10`
        - **Keyset pagination** `/api/employees?searchAfter=b1333cad9d7c4a648823db8c9aa55646&limit=10`
        - **Get single by id** `/api/employees/b1333cad-9d7c-4a64-8823-db8c9aa55646`
        - **Create** `/api/employees`
        - **Update** `/api/employees/b1333cad-9d7c-4a64-8823-db8c9aa55646`
        - **Deleting** `/api/employees/b1333cad-9d7c-4a64-8823-db8c9aa55646`
        - **Patching** `/api/employees/b1333cad-9d7c-4a64-8823-db8c9aa55646`

9. **Case Study 4: CRUD API using Postgres with Sequelize ORM**
    - Installing and configuring `Sequelize ORM`
    - Creating models
    - Model associations
    - Wrap insert, update and delete operations inside of a transaction
    - Prepare seed data for migrations
    - Creating and applying migrations
    - Perform request validation using `ajv` module

10. **Case Study 5: CRUD API using Mongoose ODM for MongoDB**
    - Understanding MongoDB
    - Installing and configuring `Mongoose ODM`
    - Creating models
    - "pre" and "post" hooks
    - Writing complex aggregate queries
    - Perform request validation using `ajv` module
    - Provide following endpoints:
        - **Offset pagination** `/api/employees?page=1&limit=10`
        - **Get single by id** `/api/employees/b1333cad-9d7c-4a64-8823-db8c9aa55646`
        - **Create** `/api/employees`
        - **Update** `/api/employees/b1333cad-9d7c-4a64-8823-db8c9aa55646`
        - **Deleting** `/api/employees/b1333cad-9d7c-4a64-8823-db8c9aa55646`
        - **Patching** `/api/employees/b1333cad-9d7c-4a64-8823-db8c9aa55646`

11. **Case Study 6: Add Caching to existing API using Redis Cache**
    - Installing and configuring `ioredis`
    - Using various redis datatypes (strings, hashes, etc.) to cache responses of the API.

12. **Case Study 7: Add Authentication and Authorization**
    - Authenticate routes using Express.js middlewares and issue JWTs by using `jsonwebtoken` module
    - Add role based authorization using `accesscontrol` module

13. **Case Study 8: Synchronous Inter-Service communication using gRPC and HTTP2**
    - Build a gateway API and internal API communicating with each other synchronously using gRPC `@grpc/grpc-js`

14. **Case Study 9: Asynchronous Inter-Service communication using Azure Service Bus**
    - Build a gateway API and internal API communicating with each other asynchronously using Azure Service Bus.

15. **Case Study 10: Add Unit Tests**
    - Add unit tests to existing CRUD API using `jest`
    - Mock dependencies using `jest`

16. **Case Study 11: Add Integration Tests**
    - Add integration tests to existing CRUD API using `supertest`

17. **Case Study 12: Add clustering to existing API**
    - Add clustering support to existing CRUD API using `pm2` module.
