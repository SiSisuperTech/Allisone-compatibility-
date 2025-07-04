# Planmeca v5

Tags: Done

### Field : “Executable du logiciel radio” / “Xray software bridge executable”

<aside>
💡 ℹ️ ”Xray software bridge executable” is the path to the program that will allow the opening of the xray software, generally the program allowing integration between PMS and Xray software. 
E.G: 
`PMS` ⇒ “Open on patient n*1” ⇒ `Xray Software` 
It is needed for current and future Allisone gateway, it is mandatory to select it on Allisone+v2 setup.

</aside>

1. Executable name for **Romexis** is called `dxstartw.exe`
    
    ![Screenshot 2024-06-11 at 15.30.40.png](8bb6a474-01ee-4cc4-933a-46f9534673a7.png)
    

### All other fields : Planmeca Romexis configuration:

- **1 -** Open Romexis, go to find the “Admin” section on the left part of the screen
    
    ![Screenshot 2023-10-04 at 11.13.14.png](Screenshot_2023-10-04_at_11.13.14.png)
    
- **2 -** Go to **Resources** tab, **Users** subtab, double click on **pmbridge**, in **Member of Groups** section, check **Administrators**. Click **OK.** Exit **Romexis**.
    
    ![Screenshot 2023-10-04 at 11.14.43.png](Screenshot_2023-10-04_at_11.14.43.png)
    
- **3 -** Open **Allisone+v2,** log the user in, select **Romexis** as software, and select the correct **Version**, below is the Planmeca Romexis configuration section :
    
    ![image (3).png](image_(3).png)
    
    - For field `Éxécutable du logiciel radio`, look for a file called `dxstartw.exe` , you should find it at the following path : `C:\Program Files\Planmeca\Romexis\pmbridge\Program\DxStartW.exe`
        
        ![Screenshot 2024-03-28 at 13.59.08.png](Screenshot_2024-03-28_at_13.59.08.png)
        
- **4 -** To find Romexis configuration info, open **Romexis configuration** program on user’s computer.
    
    ![Untitled](Untitled%206.png)
    
- **5 -** A log-in page appears, by default it should be :
    - **username :** sysadm
        - **password :** promax
        
        ![Screenshot 2023-09-28 at 14.19.06.png](Screenshot_2023-09-28_at_14.19.06.png)
        

- ⚠️ **If Romexis configuration login did not work, see this section** ⚠️
    
    If **Romexis configuration** login did not work, you must create a new user that can log into Romexis configuration
    
    - Open **Romexis** program, move your mouse to the left of the screen until a side menu appears, click **Admin**
        
        ![Untitled](Untitled%207.png)
        
    
    - click Resource tab, then subtab User, click Add on the botton of the screen. This window should appear.
    - on **User** tab :
        - username : allisone
        - password : allisone
        - retype password : allisone
        - Member of groups :  check Administrators
            
            ![Untitled](Untitled%208.png)
            
    - on **Personal** tab :
        - Person Id : allisone
        - First name : allisone
        - Last name : allisone
            
            ![Untitled](Untitled%209.png)
            
    - then click **OK**, go back to **Romexis configuration**
    

- **6 -** go to **Server Parameters** / **Database** section, on the bottom of the left-hand panel, you will find :
    - **Adresse ip de la base de donnees**
    - **Nom de la base de donnees**
    - **Port** (1433 *in most cases*)
        - (if **Port** has been changed, it will be specified at the end of **Complete URL** at the bottom of the page, after a ‘**:**’ character, e.g.: jdbc:sqlserver//localhost\ROMEXIS:**9999**)
    - **Nom de l’utilisateur** (romexis *in most cases*)
    - **Mot de passe** (romexis *in most cases*)
        
        ![Untitled](Untitled%2010.png)
        
- **7 -** go to **Image & Data Management** / **Data Folders** section in the left hand panel, you will find the following info :
    - **Dossier radio Romexis**
    ℹ️ ”[Carestream / Vatech / Romexis…] **xray folder**” is the path where xray files are stored, meaning the folder to be monitored in order to have the “there is a new xray” signal and information
        
        ![Screenshot 2023-09-28 at 14.50.04.png](Screenshot_2023-09-28_at_14.50.04.png)
        
- **8 -** copy paste the info to the correct fields, result should be like :
    
    ![Screenshot 2023-09-28 at 15.48.38.png](Screenshot_2023-09-28_at_15.48.38.png)
    
- **9 -** With all fields filles, you can now **Tester la connexion** to the database to see if the configuration works.
    - ⚠️ if it did not recheck all fields and compare them : **character case is crucial** ⚠️
    - **Save (Enregistrer)**
    - restart **Allisone+v2**
        - right click tray menu
        - click **Quitter**
- **10 -** Ask the user to start Romexis as he would do in his normal process
    - [if the Romexis software opened by the user has “pmbridge” as a user in top bar, then you can skip next steps and go directly to step 12 (try to do a test blank xray) and skip steps 13 14](Du%CC%88rr%20Dental%20-%20VistaSoft%20v3%20e812304a35b34a4a86700740c389cd58.md)
        
        ![Capture d’écran 2023-11-07 à 15.32.37.png](Capture_decran_2023-11-07_a_15.32.37.png)
        
- **11 -** Go to `C:\Program Files\Planmeca\Romexis\pmbridge\Program` and start `Romexis.bat`.
    
    ![Screenshot 2023-10-04 at 11.22.53.png](Screenshot_2023-10-04_at_11.22.53.png)
    
- **12 -** Ask the user to perform a blank xray to confirm the installation worked. Ask him to :
    - create a new patient for the test (it won’t appear on the homepage otherwise)
    - perform an xray for this test patient (with no patient in the xray room)
    - ⇒ at this stage of setup, the new patient should appear in **Allisone** webapp Carousel
- **13 -** Once you are sure everything works correctly, user will now need to start Romexis with this `C:\Program Files\Planmeca\Romexis\pmbridge\Program\Romexis.bat` ****(sometimes `Romexis` ) file.
    - replace user’s shortcut to Romexis by a shortcut to `C:\Program Files\Planmeca\Romexis\pmbridge\Program\Romexis.bat`
    
- **14 -** Change the icon of Romexis.bat and rename it as Romexis + Remove the old shortcut of the desktop.
    
    ![Capture d’écran 2023-10-04 à 10.33.12.png](Capture_decran_2023-10-04_a_10.33.12.png)
    

- How to change the icon of the shortcut :

[Change_ROMEXIS_PMBRIDGE_BAT_ICON.mov](Change_ROMEXIS_PMBRIDGE_BAT_ICON.mov)