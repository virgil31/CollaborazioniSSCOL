Ext.define('CL.controller.C_preview', {
    extend: 'Ext.app.Controller',

    showWindowPreview: function(animateTarget,file_url){

        var main_panel;

        var extension = file_url.split('.').pop();
        console.log(extension);

        switch (extension){
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'tif':
            case 'tiff':
                main_panel = {
                    xtype: "imageviewer",
                    src: 'data/preview/image.php?file_id='+file_id,
                    height: 830
                };
                break;

            case 'pdf':
                main_panel = {
                    xtype: "component",
                    width: '100%',
                    height: '100%',
                    autoEl: {
                        tag: "iframe",
                        src: "resources/lib/pdfjs/web/viewer.html?file=..%2F..%2F..%2F..%2Fdata%2Fpreview%2Fpdf.php%3Ffile_url%3D"+file_url+"#page=1"
                    }
                };
                break;

            case "txt":
            case "sql":
            case "jgw":
            case "tmp":
            case "tfw":
                main_panel =  {
                    xtype: "component",
                    name: 'comp_preview',
                    width: '100%',
                    height: '100%',
                    border: false,
                    autoEl: {
                        tag: "iframe",
                        src: 'data/preview/textual.php?file_url='+file_url
                    }
                };
                break;

            // DOCX -> http://stackoverflow.com/questions/4587216/how-can-i-convert-a-docx-document-to-html-using-php
            // ZIP - RAR
            case "xls":
            case "xlsx":
            case "doc":
            case "docx":
                main_panel =  {
                    xtype: "component",
                    name: 'comp_preview',
                    width: '100%',
                    height: '100%',
                    border: false,
                    autoEl: {
                        tag: "iframe",
                        src: 'data/preview/office_iframe.php?file_url='+file_url
                    }
                };
                break;


            default:
                Ext.Msg.alert("Attenzione!","Impossibile vedere l'anteprima del formato <b>"+obj["extension"]+"</b>");
                return;
        }

        Ext.create("Ext.window.Window",{
            resizable: false,
            constrain: true,
            modal: true,
            autoShow: true,
            title: 'Anteprima Documento',
            width: '100%',
            height: '100%',
            //width: 960,
            //height: 800,
            animateTarget: animateTarget,
            items: [
                main_panel
            ]
        });
    }

});
