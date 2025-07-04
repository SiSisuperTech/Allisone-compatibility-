# Gendex - Vixwin Platinum v3

Tags: Done

## Setup

### Server only

![image.png](image%204.png)

- Select Gendex Vixwin as Radio soft
- Select Version 3 (see Tips section to know if the user’s version is handled)
- Select the path of executable
- Select the path of radio folder

### Server + Bridge OR Bridge only

![image.png](image%205.png)

- Select Gendex Vixwin as Radio soft
- Select Version 3 - bridge mode
- Select the path of executable
- Select the path of PARENT of radio folder
- Open vixwin and activate the bridge version (puente in spanish)

![image.png](image%206.png)

![image.png](image%207.png)

## Errors

If you get a **Invalid configuration** error notification it means on of the following : 

1. `X-Ray Folder` is not an actual folder
2. `IMGS.DBF` or `PATS.DBF` could not be found in Server Mode
3. `VXDATA/` of `VXIMAGES/` could not be found in Bridge Mode
1. If you had a **Successful notification** 
    1. Ask the user to perform a test blank panoramic xray. It should appear in Allisone web application.

## Tips

- Find the `Gendex Vixwin version`
    
    To find the version : 
    
    - Click on `Help` (`Ayuda` in screenshot), and then on `About` (`Acerca` in screenshot)
        
        ![Screenshot 2024-06-26 at 17.39.42.png](Screenshot_2024-06-26_at_17.39.42.png)
        
    - A window opens up, version is written on first line (here `Vixwin Platinum **v3.3`** )
        
        ![Screenshot 2024-06-26 at 17.40.04.png](Screenshot_2024-06-26_at_17.40.04.png)
        
    - We support `v3.x.y`
- Find the `X-Ray Folder`
    1. Start `Vixwin` or `Vixwin Platinum` software
        
        ![Gendex_0-vixwin_platinum.png](Gendex_0-vixwin_platinum.png)
        
    2. In the top bar of the software click `Options` then click `Preferences`
        
        ![Gendex_1-OPCIONES.png](Gendex_1-OPCIONES.png)
        
    3. In `Preferences` Window : 
        
        ![Storage hard drive location and Vixwin Bridge/Standalone modes](Gendex_2-Preferencias.png)
        
        Storage hard drive location and Vixwin Bridge/Standalone modes
        
        - **step A -** If the configuration is set to `Bridge` mode. Cancel the installation and call a technician (@Axel Aidan)
        - **step B -** Check the hard drive disk where the Xrays are stored (in the example it is `Z:\`)
    4. If you changed anything, click `OK` , otherwise click `Cancel`
    5. Image File Format presets for Panoramic must be set to `TIFF` :
        
        ![GENDEX_INSTALL_PANO_RETR_16BITS_TIFF_explanations.jpg](GENDEX_INSTALL_PANO_RETR_16BITS_TIFF_explanations.jpg)
        
        1. Pass `Panoramic 8bit` to `TIFF` 
        2. Pass `Panoramic 16bit` to `TIFF`
        
        ![Screenshot 2024-10-03 at 16.57.29.png](Screenshot_2024-10-03_at_16.57.29.png)
        
    6. Open a `File explorer` and navigate to the hard drive disk you saw in step [3 - B](Gendex%20-%20Vixwin%20Platinum%20v3%203318a02a730a4aa9be6329b78651c6ed.md) (E.G.: `Z:\`) 
        
        ![Gendex_3-computer.png](Gendex_3-computer.png)
        
        ![Gendex_4-folder.png](Gendex_4-folder.png)
        
        1. Navigate to `VXDATA\` folder
        2. Check for the presence of `IMGS.DBF` and `PATS.DBF` files. If you see those, it means you are at the right place
        3. Copy the path to this folder in the top bar of the File Explorer (E.G: “`Z:\VXDATA\`")
    7. In `Allisone+v2` configuration window, select the folder you have found in previous steps
        
        ![Screenshot 2024-04-09 at 15.52.04.png](Screenshot_2024-04-09_at_15.52.04.png)
        
- Find the `X-Ray Software Bridge Executable`
    
    We will be looking for `vixwin.exe` file : 
    
    1. In Windows start menu look for `Vixwin` program, then right click `Vixwin` or `Vixwin Platinum`, then select `Open location of the file`
        
        ![Screenshot 2024-04-09 at 15.24.38.png](Screenshot_2024-04-09_at_15.24.38.png)
        
    2. A folder opens on `vixwin.exe` file
        
        ![Screenshot 2024-04-09 at 15.24.49.png](Screenshot_2024-04-09_at_15.24.49.png)
        
    
- Switch from Server to Bridge mode & History importation Demo
    
    [Screen Recording 2025-02-06 at 14.06.50.mov](Screen_Recording_2025-02-06_at_14.06.50.mov)