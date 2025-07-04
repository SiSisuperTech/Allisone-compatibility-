# Carestream v7

Tags: Done

<aside>
⚠️ `Formatted Patient ID mode` checkbox

Is an optional field for `Carestream` gateway configuration under testing phase

Do no check it for the moment. Will be documented when duely tested. It is totally optional and will not be needed for installation.

![Screenshot 2024-07-15 at 18.24.26.png](Screenshot_2024-07-15_at_18.24.26.png)

</aside>

### Carestream configuration

1. Click on “Preferences”
    
    ![Untitled](Untitled%2011.png)
    

1. Select 
    1. “Enregistrer les nouvelles images automatiquement” and 
    2. “Enregistrer automatiquement une copie des images dans un format de fichier standard : **JPEG**”
    

![Untitled](Untitled.png)

### Field “Executable du logiciel radio” / “Xray software bridge executable”

<aside>
💡 ℹ️ ”**Xray software bridge executable**” is the path to the program that will allow the opening of the xray software, generally the program allowing integration between PMS and Xray software. 
E.G: 
`PMS` ⇒ “Open on patient n*1” ⇒ `Xray Software` 
It is needed for current and future Allisone gateway, it is mandatory to select it on Allisone+v2 setup.

</aside>

1. Executable name for Carestream is called `TW.exe` 
2. ⚠️ PATH + screenshot to be retrieved in TV session on a setup

### Field “Dossier Radio Carestream” / “Carestream xray folder”

<aside>
💡 ℹ️ ”[Carestream / Vatech / Romexis…] **xray folder**” is the path where xrays are stored, meaning the folder to be monitored in order to have the “there is a new xray” signal and information

</aside>

1. Find the path through the Windows explorer

*⚠️As of april 2024, there was no systematic method found to always retrieve this information easily. Some searching needs to be performed⚠️*

![Untitled](Untitled%2012.png)

### Path Parent Level (starting from A+ v2.5.0)

This should match the level at which A+ tries to find the patient id, from the detected x-ray path (it should be a `tif` or `jpeg` file).

A+ tries to find the patient id from:

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