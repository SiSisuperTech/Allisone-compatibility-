# Vatech - EzDent-i V5+ - DataBase Folder mode (2)

Tags: Done

**VATECH - DataBase folder installation —** ⚠️ **AFTER `1.20.0` RELEASE —**

<aside>
💡 Here’s what you’ll need

To install Allisone+ v2 with Vatech EzDent-i software (v1, 2, 3) here are the steps to follow. You’ll need 3 fields to fill in 

1. `Exécutable du logiciel radio` / `X-Ray Software Bridge Executable` : path of `[Vatech EzDent-i <=> PMS]` bridge program
2. `Dossier radio Vatech` : 

</aside>

![Screenshot 2024-03-25 at 18.21.30.png](Screenshot_2024-03-25_at_18.21.30.png)

## 1. Executable du logiciel radio

If the user uses the PMS to take an X-ray

- To find the path for **Exécutable du logiciel radio** look for `VTEzBridge32.exe` (It should be located in `C:\Program Files (x86)\VATECH\EzDent-i\Bin\VTEzBridge32.exe`)
- 🇪🇸 Spanish users
    
    <aside>
    🇪🇸 *On spanish computers, `Program Files(x86)` is called `Archivos de programas(x86)`*
    
    </aside>
    
- See this section if you can not find `VTEzBridge32.exe`
    - Find EzDent on the Desktop > Right click on it > Copy the “Cible” field
        
        ![Capture d’écran 2024-02-19 à 17.48.08 (1).png](Capture_decran_2024-02-19_a_17.48.08_(1).png)
        
    - The `VTEzBridge32.exe` file should be in the same directory as the target of this shortcut, ⚠️**Do not “just” copy paste the path to this file**⚠️

<aside>
⚠️

Make sure this executable file is not configured as “admin”. From the screenshot, the checkbox must be **unselected**.

![Screenshot 2024-12-04 at 14.10.16.png](Screenshot_2024-12-04_at_14.10.16.png)

</aside>

## 2. Fichier patient info & Fichier image info

<aside>
⚠️ Do not change the user’s **EzDent-i** configuration. To make sure you did not change anything, click `Close` instead of `Save` when you’re done retrieving configuration info ⚠️

</aside>

- Right click on `VTFileManager` small icon on the screen bottom right side, and click `Configuration`
    
    ![Screenshot 2024-03-25 at 18.02.28.png](Screenshot_2024-03-25_at_18.02.28.png)
    
    ![Screenshot 2024-03-25 at 17.55.31.png](Screenshot_2024-03-25_at_17.55.31.png)
    
- Most of the time it will be `C:\Program Files (x86)\VATECH\Common\FM\FMData\Files`
- Copy The `Data File Path` field of the configuration window
    
    ![Screenshot 2024-03-25 at 17.55.35.png](Screenshot_2024-03-25_at_17.55.35.png)
    
- In Allisone+v2, open the configuration for `Dossier radio Vatech` , paste the `Data file path` path copied in previous step, and select the `Files` folder
    
    ![Screenshot 2024-03-25 at 18.39.23.png](Screenshot_2024-03-25_at_18.39.23.png)
    
- The configuration should be like :
    
    [https://www.notion.so](https://www.notion.so)