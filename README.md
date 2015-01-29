# dwsync

This is a cli tool that wraps around [webdav-sync](http://github.com/bermi/webdav-sync) and uses config files instead of command line parameters, thus offering developers the chance to work with multiple environments and easily switch between them, without needing Eclipse+UX Studio.

Developers can now use whatever their editor/IDE of choice might be and only boot up UX Studio for pipeline work, and debugging.

## Configuration
In order for the tool to work, a `.dwsyncrc` file needs to be added to the root folder of the project. The file should contain JSON data about the stages that the developer currently has access to, and must respect the format outlined below:

```javascript
{
    "stage1" : {
        "protocol" : "https",
        "username" : "aoprea",
        "password" : "stage1Password",
        "projectFolder": "/home/username/Projects/project-dir",
        "remotePath": "stage1.realm.com/CartridgesDirectory"
    },

    "stage2" : {
        "protocol" : "https",
        "username" : "aoprea",
        "password" : "stage2Password",
        "projectFolder": "/home/username/Projects/project-dir",
        "remotePath": "stage2.realm.com/CartridgesDirectory",
        "verbose" : true
    }
}
```

## Usage

Note that in order for the sync to start you have to run the connect command in the project's root folder, where your `.dwsyncrc` file resides, otherwise the tool will exit.

```text
$ dwsync

  Usage: dwsync [cmd] options


  Commands:

    connect [instance]  Connects to the [instance] instance.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

  Examples:
    $ cd dwre-project-root && dwsync connect sandbox1      Starts the sync using the "sandbox1" setup in .dwsyncrc
    $ cd dwre-project-root && dwsync connect staging       Starts the sync using the "staging" setup in .dwsyncrc
```

The project is currently work in progress and it will undergo further development, but at this point, you are using it at your own risk, and I am not responsible if by any chance, sync goes wrong.
