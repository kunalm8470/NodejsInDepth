const os = require('os');

// os.tmpdir() will give the absolute path of this temp directory
console.log('Temp directory of the OS: ', os.tmpdir());

// To find out endianness we can use os.endianness
// return values can BE or LE
console.log('Endianness: ', os.endianness());

// To get the device name of the computer
// we can os.hostname()
console.log('Device name where the OS is installed: ', os.hostname());

// To get the name of the kernel, we can use os.type()
console.log('To get the kernel name of the current OS installed: ', os.type());

// To get the operating system name, we can use os.platform()
// Windows - win32
// MacOS - darwin
// Linux - unix
console.log('To get the operating system name: ', os.platform());

/*
    If you want to target some code specifically to windows OS's -

    if (os.platform() === 'win32') {

    } 

    If you want to target some code specifically to MacOS's -

    if (os.platform() === 'darwin') {

    } 
*/

// To get current architecture of the OS, we can use os.arch()
/*
    x86 - 32 bit OS's
    x64 - 64 bit OS's
    xia-32/64 - for Intel Itanium processors 
*/
console.log('To get to know the current architecure of the OS: ', os.arch());

// To know the version of the Operating system installed, we can use os.release()
console.log('To get to know the release version of the OS installed: ', os.release());

// To get the duration of the Operating system up and running, we can use os.uptime()
// To get the data in hours divide by 3600
// Because 1 min is 60 seconds, 1 hour is 60 minutes = 60 * 60
console.log('Number of seconds the OS is up and running for: ', os.uptime());

// To know the amount of installed RAM in the computer in bytes, we can use os.totalmem()
// 1 KB = 1024 bytes
// 1 MB = 1024 KB
// 1 GB = 1024 MB
console.log('To get the total amount of RAM installed in bytes: ', os.totalmem());
console.log('To get the total amount of RAM installed in gigabytes: ', (os.totalmem() / (1024 * 1024 * 1024)));

// To know the amount of free RAM in the computer in bytes, we can use os.freemem()
// 1 KB = 1024 bytes
// 1 MB = 1024 KB
// 1 GB = 1024 MB
console.log('To get the free amount of RAM installed in bytes: ', os.freemem());
console.log('To get the free amount of RAM installed in gigabytes: ', (os.freemem() / (1024 * 1024 * 1024)));

// To get the list of processors installed in the machine, we can use os.cpus()
// os.cpus will return an array of objects
/*
    [
        {
            model: 'Name of the processor',
            speed: 'Frequency of the processor in MHz',
            times: {
                user: '<How much time user has used the processor core>',
                nice: int32,
                sys: int32,
                idle: '<How much time the processor core was idle>',
                irq: int32
            }
        }
    ]
*/
// If the processor supports Intel's hyperthreading, each processor core can do 2 times the work
// so os.cpu() will display 2 virtual cores for 1 physical core
console.log('To get the installed processor\'s list: ', JSON.stringify(os.cpus(), null, 4));

// To get the OS delimiter we can use os.EOL
// For windows OS - \r\n
// For MacOS and Linux - \n
// Note: Same as Environment.Newline in C#
console.log('To get the delimiter of the current OS: ', os.EOL);

// To get NIC cards which are installed in the current machine, we can use os.networkInterfaces()
console.log('To get NIC cards which are installed in the current machine', JSON.stringify(os.networkInterfaces(), null, 4));
