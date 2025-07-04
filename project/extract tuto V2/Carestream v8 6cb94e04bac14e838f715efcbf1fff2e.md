# Carestream v8

Tags: Done

### Carestream configurationC

<aside>
⚠️ `Formatted Patient ID mode` checkbox

Is an optional field for `Carestream` gateway configuration under testing phase

Do no check it for the moment. Will be documented when duely tested. It is totally optional and will not be needed for installation.

![Screenshot 2024-07-15 at 18.24.26.png](Screenshot_2024-07-15_at_18.24.26.png)

</aside>

1. Go to preferences 
    
    ![Untitled](Untitled%2013.png)
    

1. Click on the 💾 icone, check the last box and choose **jpeg** format 

![Untitled](Untitled%2014.png)

<aside>
⚠️

Have in mind that this CS settings apply only for the Windows user that’s logged in. If they use several windows users, the settings should be modified for all of them.

</aside>

1. You should have this with **‘JPEG’ instead of ‘TIFF’**

![CS8_TIffToJpeg copy.jpg](CS8_TIffToJpeg_copy.jpg)

### Field  “Executable du logiciel radio” / “Xray software bridge executable”

<aside>
💡 ℹ️ ”Xray software bridge executable” is the path to the program that will allow the opening of the xray software, generally the program allowing integration between PMS and Xray software. 
E.G: 
`PMS` ⇒ “Open on patient n*1” ⇒ `Xray Software` 
It is needed for current and future Allisone gateway, it is mandatory to select it on Allisone+v2 setup.

</aside>

1. Executable name for Carestream is called `TW.exe`  
2. PATH + screen Click right on ***CS > Properties*** to find the path to TW.exe

![TW.png](TW.png)

### Field “Dossier Radio Carestream” / “Carestream xray folder”

<aside>
💡 ℹ️ ”[Carestream / Vatech / Romexis…] **xray folder**” is the path where xrays are stored, meaning the folder to be monitored in order to have the “there is a new xray” signal and information

</aside>

<aside>
⚠️ This process requires to change some of the Carestream 8 settings. They must be set back to their original value once you have located the folder.

</aside>

To locate the `X-Ray folder` :

1. On the top right corner of Carestream 8 window, click the menu and select `Preferences`
    
    ![Screenshot 2024-06-14 at 15.02.11.png](Screenshot_2024-06-14_at_15.02.11.png)
    
2. On `Preferences` window, go to the most right section (`Servicio` in the screenshot). Enter the password, it is `2748` , and confirm (`Enviar` in the screenshtot).
    
    ![Screenshot 2024-06-14 at 15.02.26.png](Screenshot_2024-06-14_at_15.02.26.png)
    
3. Check the box that says `Localize Image` (`Ubicar imagen` in screenshot)
    
    ![Screenshot 2024-06-14 at 15.02.40.png](Screenshot_2024-06-14_at_15.02.40.png)
    
4. A warning appears, click `Accept` , click `Save` 
    
    ![Screenshot 2024-06-14 at 15.02.46.png](Screenshot_2024-06-14_at_15.02.46.png)
    
5. Now on any image you can right click, and select `Localize image` (`Ubicar imagen` in screenshot)
    
    ![Screenshot 2024-06-14 at 15.03.01.png](Screenshot_2024-06-14_at_15.03.01.png)
    
6. A file explorer should open up on the patient folder, the root folder of this patient folder is the `X-Ray folder` path
7. ⚠️ After you finish the installation, set the user’s Carestream 8 preferences back to their original state (Top right menu ⇒ `Preferences` ⇒ `Service` ⇒ enter password ⇒ uncheck `Localize image` ⇒ `Save`)

*(video demo)*

[IMG_6290.MOV](IMG_6290.mov)

<aside>
🇪🇸 **Spanish version -** On :C find the folder CarestreamDB

</aside>

### Path Parent Level (starting from A+ v2.5.0)

This should match the level at which A+ tries to find the patient id, from the detected x-ray path (it should be a `tif` or `jpeg` file).

A+ tries to find the patient id from:ﬁ

- *PatientInfo.xml* file (if it exists)
- *FILEDATA.txt* file (if it exists)
- Folder name
- Examples
    - Level 2 (Standard)
    
    The detected x-ray is a `jpeg` file, and there is a *PatientInfo.xml* file inside the *496* folder. So this is a 2-level architecture: *496 > JPG > P4.jpg*
    
    ```
    ├── Carestream
    │   └── 2022
    │       └── 496
    │           ├── JPG
    │           │   └── P4.jpg
    │           └── PatientInfo.xml
    ```
    
    - Level 3
    
    The detected x-ray is a `tif` file, and it looks like the patient id is the folder name, which is 3-level up: *0100022692 > carestream > CopyStorage > a23e97cfed3711ef9237.tif*
    
    ```
    └── medicover
        ├── 0100022692
        │   └── carestream
        │       ├── 0100178599a23e97cfed3711ef9237_min.mjpg
        │       ├── CopyStorage
        │       │   └── a23e97cfed3711ef9237.tif
        │       ├── a23e97cfed3711ef9237.dcm
        │       └── a23e97cfed3711ef9237.dcm.xml
        └── 0100022903
            ├── 01001786000100178600IMG_3370_min.mjpg
            ├── 0100178600IMG_3370.JPG
            ├── 0100178600IMG_3370.JPG.xml
            └── carestream
                ├── 01001785987547c76eed3611ef9dc2_min.mjpg
                ├── 7547c76eed3611ef9dc2.dcm
                ├── 7547c76eed3611ef9dc2.dcm.xml
                ├── CopyStorage
                │   └── 7547c76eed3611ef9dc2.tif
                └── FilesManager.xml
    ```
    

### Folder Structure (starting from A+ v2.5.0)

This setting is useful when the Carestream’s architecture looks like **patient folders are inside folders organized by year**, **AND these** **patient folders are NOT unique across yearly folders**. In this case, you should select the “*Yearly*” folder structure.
Otherwise, just keep the “*Standard*” one.

### Saving and testing

Now that all configuration fields are set, click `Save` on Allisone-plus v2 configuration window.

If you have an error notification, it means one of the following :

- ❌ `X-Ray folder` is not a folder
- ❌ `X-Ray software bridge executable` is not a an executable (`.exe`) file

If the notification is a success, ask the user to perform a blank panoramic x-ray. The x-ray with patient name and first name should appear on the Allisone webapp homepage carousel.