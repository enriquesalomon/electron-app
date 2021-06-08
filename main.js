const electron = require('electron');
const url = require('url');
const path =require('path');

const {app, BrowserWindow, Menu}=electron;

let mainWindow;
let addWindow;

  

//Listen for app to be ready
app.on('ready', function(){
    //create new window

    mainWindow= new BrowserWindow({fullscreen: true});
    //LOad html to window
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'mainwindow.html'),
        protocol:'file:',
        slashes:true
    }));
    //window on focused event
    mainWindow.on('blur',()=>{
      console.log('Unfocus')
    });
    //quit app when closed
    mainWindow.on('close',function(){
        app.quit();
    });

    //build menu from Template
    const mainMenu=Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});

//Handle create add window
function createAddWindow(){
     //create new window
     addWindow= new BrowserWindow({
         width:300,
         height:200,
            title:'Add Shopping List Item'
     });
     //LOad html to window
     addWindow.loadURL(url.format({
         pathname:path.join(__dirname,'addWindow.html'),
         protocol:'file:',
         slashes:true
     }));
     //Garbage collection handle
     addWindow.on('close', function(){
         addWindow= null;
     })
}

//create menu template
const mainMenuTemplate =[
{
    label:'File',
    submenu:[
        {
            label:'Add Item',
            click(){
                createAddWindow();
            }
        },
        {
            label:'Clear Items'
        },
        {
            label:'Quit',
            accelerator: process.platform == 'darwin'? 'Command+Q': 'Ctrl+Q',
            click(){
                app.quit();
            }
        },
    ]
}
];

//add developer ntools item if not in production
if(process.env.NODE_ENV !=='production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {                
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin'? 'Command+Q':
                'Ctrl+I',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
               role: 'reload' 
            }
        ]
    })
}