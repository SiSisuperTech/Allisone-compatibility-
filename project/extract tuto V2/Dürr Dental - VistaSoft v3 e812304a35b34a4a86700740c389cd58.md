# Dürr Dental - VistaSoft v3

Tags: Done

## Field “Dossier Radio” / “Xray folder”

<aside>
💡 ℹ️ ”**Xray folder**” is the path where xrays are stored, meaning the folder to be monitored in order to have the “there is a new xray” signal and information

</aside>

1. Click on the **Configuration** icon

![1-Configuration.png](1-Configuration.png)

1. Open the **Practices** tab

![2-Practices.png](2-Practices.png)

1. Select the practice you want (here Allisone), then click to **Configuration**

![3-Selected_practice.png](3-Selected_practice.png)

1. Scroll down to find the ***Image path*** field

![4-Data.png](4-Data.png)

## Field “Fichier d'importation patient” / “Import patient file path”

Click on the **Configuration** icon, then on **Interfaces** and copy the *Import path* under Patient import

![vistasoft_gateway_3.png](vistasoft_gateway_3.png)

<aside>
⚠️

The file may not exist but that’s OK, we only need the path.

</aside>

## Field  “Executable du logiciel radio” / “Xray software bridge executable”

The executable can generally be found in `C:\Program Files\Duerr\VistaSoft\Binaries\VistaSoft\VistaSoft.exe`

## Using the A+ Gateway

When the user clicks on “New Acquisition” from the webapp, he will redirected to VistaSoft.
If a patient file was already opened, a modal should pop up, inviting the user to open the new patient file:

![vistasoft_gateway_4.png](vistasoft_gateway_4.png)

Then he should see a button displayed on the toolbar at the top. Clicking on it will open the new patient file:

![vistasoft_gateway_5.png](vistasoft_gateway_5.png)