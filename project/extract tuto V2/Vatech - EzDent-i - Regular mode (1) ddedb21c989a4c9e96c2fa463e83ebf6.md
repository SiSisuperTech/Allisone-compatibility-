# Vatech - EzDent-i - Regular mode (1)

Tags: Done

**VATECH - Regular installation** 

![Screenshot 2024-02-02 at 11.05.17.png](Screenshot_2024-02-02_at_11.05.17.png)

<aside>
ℹ️ Here’s what you’ll need

To install Allisone+ v2 with Vatech EzDent-i software (v1, 2, 3) here are the steps to follow. You’ll need 3 fields to fill in 

1. `Exécutable du logiciel radio` / `X-Ray Software Bridge Executable` : path of [Vatech EzDent-i<=>PMS] bridge program
2. `Fichier patient info` / `Patient Info file path` : path to the file containing patient metadata
3. `Fichier image info` / `Image Info file path` : path to the file containing xray metadata
</aside>

Before starting, remove Allisone+ V1 if it’s already on the computer 

## 1. Executable du logiciel radio

If the user uses the PMS to take an X-ray

- To find the path for **Exécutable du logiciel radio** look for `VTEzBridge32.exe` (It should be located in `C:\Program Files (x86)\VATECH\EzDent-i\Bin\VTEzBridge32.exe`)
- 🇪🇸 Spanish users
    
    <aside>
    🇪🇸 *On spanish computers, `Program Files(x86)` is called `Archivos de programas(x86)`*
    
    </aside>
    
- If you can not find `VTEzBridge32.exe`
    - Find EzDent on the Desktop > Right click on it > Copy the “Cible” field
        
        ![Capture d’écran 2024-02-19 à 17.48.08 (1).png](Capture_decran_2024-02-19_a_17.48.08_(1).png)
        
    - Open the file explorer on the path you just copied. The `VTEzBridge32.exe` file should be in the same directory as the target of this shortcut, ⚠️**Do not “just” copy paste the path to this file**⚠️

<aside>
⚠️

Make sure this executable file is not configured as “admin”. From the screenshot, the checkbox must be **unselected**.

![Screenshot 2024-12-04 at 14.10.16.png](Screenshot_2024-12-04_at_14.10.16.png)

</aside>

## 2. Fichier patient info & Fichier image info

<aside>
⚠️ Do not change the user’s **EzDent-i** configuration. To make sure you did not change anything, click `Close` instead of `Save` when you’re done retrieving configuration info ⚠️

</aside>

1. Open Vatech > Acquisition > Panorama 
    
    ![Untitled](Untitled%2015.png)
    
2. Open the control panel
    
    ![Untitled](Untitled%2016.png)
    
3. Go to `General` tab (3rd tab), on the right hand side section you will find 
    
    ![Untitled](Untitled%2017.png)
    

## 3. Installation check

The Allisone+ window should look like this 

Click on “Save”

If you get a **Invalid configuration** error notification it means :

- `Fichier patient info` or `Fichier imagine info` fields are not **files** or **do not exist**

If you had a **successful notification** 

- ask the user to perform a test blank panoramic xray. It should appear in Allisone web application.

![Screenshot 2024-02-02 at 11.05.17.png](Screenshot_2024-02-02_at_11.05.17.png)