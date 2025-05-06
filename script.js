// Data for X-ray software with updated messages
const xraySoftwareData = [
    { name: "AIS - Acteon", output: "Watcher Light + Dicom export ✅", supportedVersions: "Supported versions: ≥ 5.3 (paid upgrade)" },
    { name: "Cliniview - KaVo Instrumentarium", output: "Automatic X-ray Acquisition ✅ (Full Watcher)" },
    { name: "CS Imaging - Carestream", output: "Automatic X-ray Acquisition ✅ (Full Watcher)", supportedVersions: "Supported versions: ≥ 6.x, 7.x, 8.x" },
    { name: "DBSWin - Durr Dental", output: "Watcher Light + Dicom export ✅" },
    { name: "Dentrix Ascend - Henry Schein", output: "Manual X-ray upload ✅" },
    { name: "DTX Studio - Visualization", output: "Manual X-ray upload ✅" },
    { name: "Examine Pro - Examine Pro", output: "Automatic X-ray Acquisition ✅ (Full Watcher Dicom)" },
    { name: "Ezdent-i - Vatech", output: "Automatic X-ray Acquisition ✅ (Full Watcher Dicom)", supportedVersions: "Supported versions: All versions (3.x)" },
    { name: "i-Dixel - Morita", output: "Watcher Light + Dicom export ✅" },
    { name: "iRYS - MyRay", output: "Automatic X-ray Acquisition ✅ (Full Watcher Dicom)", supportedVersions: "Supported versions: ≥ 16" },
    { name: "Mediadent - Mediadent", output: "Watcher Light + Dicom export ✅" },
    { name: "MiPACS Dental Enterprise Viewer - Medicor Imaging", output: "Manual X-ray upload ✅" },
    { name: "NNT - Newtom", output: "Manual X-ray upload ✅" },
    { name: "QuickVision - Owandy", output: "Automatic X-ray Acquisition ✅ (Full Watcher Dicom)" },
    { name: "RayScan - Ray", output: "Automatic X-ray Acquisition ✅ (Full Watcher Dicom)" },
    { name: "Romexis - Planmeca", output: "Watcher Light + Dicom export ✅", supportedVersions: "Supported versions: ≥ 5.x" },
    { name: "Scanora - Soredex", output: "Automatic X-ray Acquisition ✅ (Full Watcher)" },
    { name: "Sidexis - Dentsply Sirona", output: "Automatic X-ray Acquisition ✅ (Full Watcher)", supportedVersions: "Supported versions: ≥ 4.x (XG not supported yet)" },
    { name: "VisiQuick - Citodent", output: "Automatic X-ray Acquisition ✅ (Allisone+ v2 Bridge/Server)" },
    { name: "VistaSoft - Durr Dental", output: "Watcher Light + Dicom export ✅", supportedVersions: "Supported versions: 2.x or 3.x" },
    { name: "VixWin - Gendex", output: "Watcher Light + Dicom export ✅", supportedVersions: "Supported versions: All versions prior to 4.x" },
    { name: "XrayVision - Apteryx Imaging", output: "Manual X-ray upload ✅" },
];

// Data for PMS
const pmsData = [
    "Biotech Dental",
    "Desmos",
    "Julie",
    "Logosw",
    "OrisDent - OrisLine",
    "Powerdent - Kopfwerk",
    "SPDentaire",
    "Ulyses",
    "Veasy",
    "WeClever",
];

// Special compatibility combinations
const commonXraySoftwareForPms = [
    "VistaSoft - Durr Dental",
    "Romexis - Planmeca",
    "Sidexis - Dentsply Sirona",
    "CS Imaging - Carestream",
    "Ezdent-i - Vatech",
];

const specialCombinations = {
    Desmos: commonXraySoftwareForPms,
    Julie: commonXraySoftwareForPms,
    Logosw: commonXraySoftwareForPms,
    SPDentaire: commonXraySoftwareForPms,
    Ulyses: commonXraySoftwareForPms,
    WeClever: commonXraySoftwareForPms,
};

// Logo URLs for X-ray software
const xraySoftwareLogos = {
    "AIS - Acteon": "https://sfe-endo.fr/wp-content/uploads/2023/05/ACTEON-logo.png", // Replace with actual logo URLs
    "Cliniview - KaVo Instrumentarium": "https://cdn.elmed.cz/images/0/1ac8808f6d80b096/2/licence-cliniview-1-pc-network-user-add-on.jpg?hash=1487825817",
    "CS Imaging - Carestream": "https://www.comident.fr/wp-media/uploads/2023/10/CSD_Logo_NEW2020_Shadow.png",
    "DBSWin - Durr Dental": "https://cdn.bimedis.com/search/aimage/wide/1381652",
    "Dentrix Ascend - Henry Schein": "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_6cc28c7b4d8e98000efb5fea6a4ebd67/dentrix-ascend.png",
    "DTX Studio - Visualization": "https://www.dtxstudio.com/sites/g/files/wdvifx246/files/styles/mobile_375_full_width_x1/public/DTX%20Studio%20Clinic%20icon_pseudoteaser.png.webp?itok=ORa8G9yA",
    "Examine Pro - Examine Pro": "https://img.medicalexpo.fr/images_me/photo-mg/74092-8210123.jpg",
    "Ezdent-i - Vatech": "https://vatech-france.fr/wp-content/uploads/2019/12/Logo-1.png",
    "i-Dixel - Morita": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvfL0hhKiLWqsm2x9VTWK6K60j3N6PbMPXjA&s",
    "iRYS - MyRay": "https://example.com/logos/irys.png",
    "Mediadent - Mediadent": "https://www.mipacs.com//_next/static/media/mipacs-by-apryse-colour.8b5ddab8.svg",
    "MiPACS Dental Enterprise Viewer - Medicor Imaging": "https://example.com/logos/mipacs.png",
    "NNT - Newtom": "https://alldent.nl/wp-content/uploads/2020/08/5958-nnt-logo_thumb.jpg",
    "QuickVision - Owandy": "https://www.owandy.fr/wp-content/uploads/2024/12/logo-QuickVision_white.png",
    "RayScan - Ray": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkSZoiRkki_lbu932Oxdjo09BygxAG51z5w&s",
    "Romexis - Planmeca": "https://www.lmdfrance.fr/public/img/big/maxresdefault1jpg_65f06fb46dd691.07855911.jpg",
    "Scanora - Soredex": "https://www.dentalsky.com/media/amasty/shopby/option_images/Soredex.jpg",
    "Sidexis - Dentsply Sirona": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg2FwEARD5XNGrlEuZqACvEvvOSXbRVABu6pSemIcUlNajL90u_LQSHpdtjgoSr_ourHo&usqp=CAU",
    "VisiQuick - Citodent": "https://i0.wp.com/www.citodent.com/wp-content/uploads/2016/12/cropped-Logo-VisiQuick.jpg?fit=512%2C512&ssl=1",
    "VistaSoft - Durr Dental": "https://help.vsmonitor.com/dd/graphics/00310898.png",
    "VixWin - Gendex": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ebay.com%2Fitm%2F304495602501&psig=AOvVaw39xKqFkRvEDO4Qa0KbQATc&ust=1746544703360000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDP4ZbQjI0DFQAAAAAdAAAAABAE",
    "XrayVision - Apteryx Imaging": "https://media.dentalcompare.com/m/25/article/517681-134x100.jpg",
};

// Logo URLs for PMS systems
const pmsLogos = {
    "Biotech Dental": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/LOGO_BIOTECH_DENTAL-HD.jpg/1280px-LOGO_BIOTECH_DENTAL-HD.jpg", // Replace with actual logo URLs
    "Desmos": "https://astucetierspayant.fr/wp-content/uploads/2023/12/Desmos.jpg",
    "Julie": "https://www.julie.fr/julie_uploads/2022/10/logo-bleu-115x75-1.png",
    "Logosw": "https://www.logosw.net/telechargement/presse/logosw-1000.png",
    "OrisDent - OrisLine": "https://orisdent.com/wp-content/themes/orisdent/img/orisline-logo.png",
    "Powerdent - Kopfwerk": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/brand/2023_04_11_17_51_41_9/48614d56-6434-40fc-984e-307c8cf1960f-marca-powerdent-carrossel.svg",
    "SPDentaire": "https://www.sp-formations.eu/wp-content/uploads/2023/11/cropped-sante_rouge.webp",
    "Ulyses": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Vitaldent.svg/2560px-Vitaldent.svg.png",
    "Veasy": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3wfhXKXkJ2yWx4CSXQpO-LXcDTnRV32DbjQ&s",
    "WeClever": "https://weclever-dental.com/wp-content/uploads/2023/04/Weclever_Logo-Dental_Off_PNG.png",
};

// Sort data
xraySoftwareData.sort((a, b) => a.name.localeCompare(b.name));
pmsData.sort();

// Populate dropdowns
const xraySelect = document.getElementById("xraySoftware");
xraySoftwareData.forEach((software) => {
    const option = document.createElement("option");
    option.value = software.name;
    option.textContent = software.name;
    xraySelect.appendChild(option);
});

const pmsSelect = document.getElementById("pms");
pmsData.forEach((pms) => {
    const option = document.createElement("option");
    option.value = pms;
    option.textContent = pms;
    pmsSelect.appendChild(option);
});

// Handle dynamic updates
function updateOutput() {
    const selectedXray = xraySelect.value;
    const selectedPms = pmsSelect.value;

    const outputElement = document.getElementById("output");
    outputElement.innerHTML = ""; // Clear previous output
    
    // Handle logo display
    const logoDisplay = document.getElementById("logoDisplay");
    const xrayLogo = document.getElementById("xrayLogo").querySelector("img");
    const pmsLogo = document.getElementById("pmsLogo").querySelector("img");
    const xrayLogoLabel = document.getElementById("xrayLogoLabel");
    const pmsLogoLabel = document.getElementById("pmsLogoLabel");
    
    // Set default to hide logo display
    logoDisplay.style.display = "none";
    
    // Update logos if selections are made
    if (selectedXray || selectedPms) {
        if (selectedXray) {
            const softwareName = selectedXray.split(" - ")[0];
            let xrayLogoSrc = xraySoftwareLogos[selectedXray];
            // Check for problematic or placeholder URLs
            if (!xrayLogoSrc || xrayLogoSrc.startsWith("https://example.com") || xrayLogoSrc.includes("google.com/url")) {
                xrayLogoSrc = "placeholder-xray.png";
            }
            xrayLogo.src = xrayLogoSrc;
            xrayLogoLabel.textContent = softwareName;
            document.getElementById("xrayLogo").style.display = "block";
        } else {
            document.getElementById("xrayLogo").style.display = "none";
        }
        
        if (selectedPms) {
            const pmsName = selectedPms.split(" - ")[0];
            let pmsLogoSrc = pmsLogos[selectedPms];
            // Check for problematic or placeholder URLs
            if (!pmsLogoSrc || pmsLogoSrc.startsWith("https://example.com") || pmsLogoSrc.includes("google.com/url")) {
                pmsLogoSrc = "placeholder-pms.png";
            }
            pmsLogo.src = pmsLogoSrc;
            pmsLogoLabel.textContent = pmsName;
            document.getElementById("pmsLogo").style.display = "block";
        } else {
            document.getElementById("pmsLogo").style.display = "none";
        }
        
        // Show logo display if at least one selection is made
        if (selectedXray || selectedPms) {
            logoDisplay.style.display = "flex";
            
            // Show/hide the divider based on whether both are selected
            document.querySelector(".logo-divider").style.display = 
                (selectedXray && selectedPms) ? "flex" : "none";
        }
    }

    if (!selectedXray && !selectedPms) {
        outputElement.style.display = "none";
        return;
    }

    // Check for special compatibility
    if (selectedXray && selectedPms && specialCombinations[pms]?.includes(selectedXray)) {
        // Update compatibility indicator
        const compatibilityIndicator = document.createElement("div");
        compatibilityIndicator.classList.add("compatibility-indicator");
        compatibilityIndicator.innerHTML = '<i class="fas fa-check-circle"></i> Fully Compatible';
        
        outputElement.appendChild(compatibilityIndicator);
        outputElement.appendChild(document.createTextNode(
            `Fully compatible gateway with X-ray acquisition and synchronisation of report into ${selectedPms} dental scheme`
        ));
        
        // Add installation guide links section
        addInstallationGuideLinks(outputElement, selectedXray, selectedPms);
        
        outputElement.style.display = "block";
        addVideoPlaceholdersForPMS(selectedPms); // Add video placeholders for specific PMS
        return;
    }

    // Display modified output for Logosw with specific X-ray software
    if (selectedPms === "Logosw") {
        const logoswGroup1 = [
            "CS Imaging - Carestream",
            "Sidexis - Dentsply Sirona",
            "Cliniview - KaVo Instrumentarium",
            "Scanora - Soredex"
        ];

        const logoswGroup2 = [
            "Ezdent-i - Vatech",
            "QuickVision - Owandy",
            "iRYS - MyRay",
            "RayScan - Ray",
            "Examine Pro - Examine Pro"
        ];

        const logoswGroup3 = [
            "Romexis - Planmeca",
            "AIS - Acteon",
            "VixWin - Gendex",
            "VistaSoft - Durr Dental",
            "Mediadent - Mediadent",
            "DBSWin - Durr Dental",
            "i-Dixel - Morita"
        ];

        if (logoswGroup1.includes(selectedXray)) {
            outputElement.textContent = "Logosw report synchronisation (full watcher) OR X-ray instant acquisition";
            outputElement.style.display = "block";
            // Add installation guide links
            addInstallationGuideLinks(outputElement, selectedXray, selectedPms);
            addVideoPlaceholdersForPMS("Logosw"); // Add video placeholders for Logosw and compatible X-ray
            return;
        }

        if (logoswGroup2.includes(selectedXray)) {
            outputElement.textContent = "Logosw report synchronisation (full watcher dicom) OR X-ray instant acquisition";
            outputElement.style.display = "block";
            // Add installation guide links
            addInstallationGuideLinks(outputElement, selectedXray, selectedPms);
            addVideoPlaceholdersForPMS("Logosw");
            return;
        }

        if (logoswGroup3.includes(selectedXray)) {
            outputElement.textContent = "Logosw report synchronisation (watcher light) OR X-ray instant acquisition";
            outputElement.style.display = "block";
            // Add installation guide links
            addInstallationGuideLinks(outputElement, selectedXray, selectedPms);
            addVideoPlaceholdersForPMS("Logosw");
            return;
        }
    }

    // Display output for X-ray software only
    if (selectedXray) {
        const xrayOutput = xraySoftwareData.find((software) => software.name === selectedXray)?.output;
        const supportedVersions = xraySoftwareData.find((software) => software.name === selectedXray)?.supportedVersions;
        if (xrayOutput) {
            // Update compatibility indicator based on output text
            const isCompatible = xrayOutput.includes("✅");
            const compatibilityIndicator = document.createElement("div");
            compatibilityIndicator.classList.add("compatibility-indicator");
            
            if (isCompatible) {
                compatibilityIndicator.innerHTML = '<i class="fas fa-check-circle"></i> Compatible';
                compatibilityIndicator.style.color = "#198754";
                compatibilityIndicator.style.backgroundColor = "rgba(25, 135, 84, 0.1)";
            } else {
                compatibilityIndicator.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Limited Compatibility';
                compatibilityIndicator.style.color = "#fd7e14";
                compatibilityIndicator.style.backgroundColor = "rgba(253, 126, 20, 0.1)";
            }
            
            outputElement.appendChild(compatibilityIndicator);
            
            // Create text container
            const textContainer = document.createElement("div");
            textContainer.textContent = xrayOutput;
            outputElement.appendChild(textContainer);
            
            // Add installation guide links
            addInstallationGuideLinks(outputElement, selectedXray, selectedPms);
            
            outputElement.style.display = "block";
            
            if (supportedVersions) {
                addSecondaryMessage(supportedVersions); // Always show supported versions when X-ray is selected
            }
        }
    } else {
        outputElement.style.display = "none";
    }
}

// Function to add installation guide links to the output
function addInstallationGuideLinks(outputElement, selectedXray, selectedPms) {
    // Create container for installation guides
    const guidesContainer = document.createElement("div");
    guidesContainer.classList.add("installation-guides");
    
    // Create header
    const header = document.createElement("div");
    header.classList.add("guide-header");
    header.innerHTML = '<i class="fas fa-book-open"></i> Installation Guides';
    
    guidesContainer.appendChild(header);
    
    // Create list of guides
    const guidesList = document.createElement("ul");
    
    let hasGuides = false;
    
    // Add X-ray software guide if available
    if (selectedXray && notionLinks.software[selectedXray]) {
        const listItem = document.createElement("li");
        
        const link = document.createElement("a");
        link.href = notionLinks.software[selectedXray];
        link.target = "_blank";
        link.classList.add("guide-link");
        
        // Add status dot for guide
        let statusDotClass = "grey";
        if (selectedXray.includes('Carestream') || 
            selectedXray.includes('VistaSoft') || 
            selectedXray.includes('Vixwin') || 
            selectedXray.includes('Planmeca') || 
            selectedXray.includes('Sidexis') || 
            selectedXray.includes('Vatech')) {
            statusDotClass = "green";
        } else if (selectedXray.includes('ExaminePro') || 
                   selectedXray.includes('iRYS') || 
                   selectedXray.includes('Visiquick')) {
            statusDotClass = "blue";
        }
        
        link.innerHTML = `<span class="status-dot ${statusDotClass}"></span> ${selectedXray} Installation Guide`;
        listItem.appendChild(link);
        guidesList.appendChild(listItem);
        hasGuides = true;
    }
    
    // Add PMS guide if available
    if (selectedPms && notionLinks.pms[selectedPms]) {
        const listItem = document.createElement("li");
        
        const link = document.createElement("a");
        link.href = notionLinks.pms[selectedPms];
        link.target = "_blank";
        link.classList.add("guide-link");
        
        link.innerHTML = '<span class="status-dot grey"></span> ' + `${selectedPms} Setup Guide`;
        listItem.appendChild(link);
        guidesList.appendChild(listItem);
        hasGuides = true;
    }
    
    // Add integration guide if available
    if (selectedXray && selectedPms && notionLinks.integration[selectedXray]?.[selectedPms]) {
        const listItem = document.createElement("li");
        
        const link = document.createElement("a");
        link.href = notionLinks.integration[selectedXray][selectedPms];
        link.target = "_blank";
        link.classList.add("guide-link");
        
        link.innerHTML = '<span class="status-dot green"></span> ' + `${selectedXray} + ${selectedPms} Integration Guide`;
        listItem.appendChild(link);
        guidesList.appendChild(listItem);
        hasGuides = true;
    }
    
    // If no guides are available, add a message
    if (!hasGuides) {
        const listItem = document.createElement("li");
        listItem.classList.add("no-guides-message");
        listItem.textContent = "No specific installation guides available for this combination";
        guidesList.appendChild(listItem);
    }
    
    guidesContainer.appendChild(guidesList);
    
    // Add "View All Guides" link
    const viewAllContainer = document.createElement("div");
    viewAllContainer.classList.add("view-all-container");
    
    const viewAllLink = document.createElement("a");
    viewAllLink.href = "#";
    viewAllLink.classList.add("view-all-link");
    viewAllLink.innerHTML = "View all installation guides <i class='fas fa-chevron-right'></i>";
    
    viewAllLink.addEventListener("click", function(e) {
        e.preventDefault();
        showAllDocumentation();
    });
    
    viewAllContainer.appendChild(viewAllLink);
    guidesContainer.appendChild(viewAllContainer);
    
    // Add to output
    outputElement.appendChild(guidesContainer);
}

// Add secondary message (e.g., supported versions)
function addSecondaryMessage(supportedVersions) {
    const secondaryMessage = document.createElement("div");
    secondaryMessage.classList.add("secondary-message");
    secondaryMessage.textContent = supportedVersions;
    document.getElementById("output").appendChild(secondaryMessage);
}

// Add video placeholders for PMS
function addVideoPlaceholdersForPMS(pms) {
    const outputElement = document.getElementById("output");
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video-placeholders-container");
    let videoPlaceholderHTML = "";

    switch (pms) {
        case "Julie":
            videoPlaceholderHTML = `
                <video controls class="video-placeholder">
                    <source src="Julie_gateway.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            break;
        case "Desmos":
            videoPlaceholderHTML = `
                <video controls class="video-placeholder">
                    <source src="Desmos.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            break;
        case "WeClever":
            videoPlaceholderHTML = `
                <video controls class="video-placeholder">
                    <source src="Weclever.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            break;
        case "SPDentaire":
            videoPlaceholderHTML = `
                <div class="video-placeholder">[Video Placeholder 1 for SPDentaire]</div>
            `;
            break;
        case "Logosw":
            videoPlaceholderHTML = `
                <video controls class="video-placeholder">
                    <source src="Logosw.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <video controls class="video-placeholder">
                    <source src="Allisone_v2_acquisition.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            break;
        default:
            videoPlaceholderHTML = `
                <div class="video-placeholder">[General Video Placeholder]</div>
            `;
            break;
    }

    videoContainer.innerHTML = videoPlaceholderHTML;
    outputElement.appendChild(videoContainer);
}

// Add event listeners for dropdown change
document.getElementById("xraySoftware").addEventListener("change", updateOutput);
document.getElementById("pms").addEventListener("change", updateOutput);

// Rather than detailed setup instructions, let's add Notion link references
const notionLinks = {
    // X-ray software links - updated with the actual guides that exist
    "software": {
        "CS Imaging - Carestream": "https://notion.so/allisone/carestream-guide",
        "Carestream v6": "https://notion.so/allisone/carestream-v6",
        "Carestream v7": "https://notion.so/allisone/carestream-v7",
        "Carestream v8": "https://notion.so/allisone/carestream-v8",
        "VistaSoft - Durr Dental": "https://notion.so/allisone/vistasoft-guide",
        "Dürr Dental - VistaSoft v3": "https://notion.so/allisone/vistasoft-v3",
        "Examine Pro - Examine Pro": "https://notion.so/allisone/examinepro-guide",
        "ExaminePro v6": "https://notion.so/allisone/examinepro-v6",
        "VixWin - Gendex": "https://notion.so/allisone/vixwin-guide",
        "Gendex - Vixwin Platinum v3": "https://notion.so/allisone/vixwin-platinum-v3",
        "iRYS - MyRay": "https://notion.so/allisone/irys-guide",
        "MyRay - iRYS": "https://notion.so/allisone/myray-irys",
        "Romexis - Planmeca": "https://notion.so/allisone/planmeca-guide",
        "Planmeca v5": "https://notion.so/allisone/planmeca-v5",
        "Planmeca v6sys": "https://notion.so/allisone/planmeca-v6sys",
        "Sidexis - Dentsply Sirona": "https://notion.so/allisone/sidexis-guide",
        "Sirona - Sidexis 4": "https://notion.so/allisone/sirona-sidexis-4",
        "Ezdent-i - Vatech": "https://notion.so/allisone/ezdent-guide",
        "Vatech - Regular (1) or Database Folder (2)": "https://notion.so/allisone/vatech-modes",
        "Vatech - EzDent-i - Regular mode (1)": "https://notion.so/allisone/ezdent-i-regular",
        "Vatech - EzDent-i V5+ - DataBase Folder mode (2)": "https://notion.so/allisone/ezdent-i-v5-database",
        "VisiQuick - Citodent": "https://notion.so/allisone/visiquick-guide",
        "Visiquick": "https://notion.so/allisone/visiquick"
    },
    
    // PMS links
    "pms": {
        "Julie": "https://notion.so/allisone/julie-setup",
        "Desmos": "https://notion.so/allisone/desmos-setup",
        "WeClever": "https://notion.so/allisone/weclever-setup",
        "Logosw": "https://notion.so/allisone/logosw-setup",
        "SPDentaire": "https://notion.so/allisone/spdentaire-setup",
        "Ulyses": "https://notion.so/allisone/ulyses-setup"
    },
    
    // Integration links (specific combinations)
    "integration": {
        "Romexis - Planmeca": {
            "Julie": "https://notion.so/allisone/romexis-julie-integration",
            "Desmos": "https://notion.so/allisone/romexis-desmos-integration"
        },
        "CS Imaging - Carestream": {
            "Julie": "https://notion.so/allisone/carestream-julie-integration",
            "WeClever": "https://notion.so/allisone/carestream-weclever-integration"
        },
        "Sidexis - Dentsply Sirona": {
            "Logosw": "https://notion.so/allisone/sidexis-logosw-integration"
        },
        "VistaSoft - Durr Dental": {
            "SPDentaire": "https://notion.so/allisone/vistasoft-spdentaire-integration"
        }
    }
};
