// Data for X-ray software with updated messages
const xraySoftwareData = [
    { name: "AIS - Acteon", output: "Automatic X-ray Acquisition ✅(Allisone+)", supportedVersions: "Supported versions: ≥ 5.x (paid upgrade)" },
    { name: "Cliniview - KaVo / Instrumentarium", output: "Automatic X-ray Acquisition ✅ (Watcher)" },
    { name: "CS Imaging - Carestream", output: "Automatic X-ray Acquisition ✅(Allisone+)", supportedVersions: "Supported versions: ≥ 6.x, 7.x, 8.x" },
    { name: "DBSWin - Durr Dental", output: "Watcher Light + Dicom export ✅" },
    { name: "Examine Pro", output: "Automatic X-ray Acquisition ✅(Allisone+)", supportedVersions: "Supported versions: version 6" },
    { name: "Ezdent-i - Vatech", output: "Automatic X-ray Acquisition ✅(Allisone+)", supportedVersions: "Supported versions: All versions (3.x)" },
    { name: "i-Dixel - Morita", output: "Watcher Light + Dicom export ✅" },
    { name: "iRYS - MyRay", output: "Automatic X-ray Acquisition ✅(Allisone+)" },
    { name: "Mediadent", output: "Automatic X-ray Acquisition ✅(Allisone+)" },
    { name: "QuickVision - Owandy", output: "Automatic X-ray Acquisition ✅(Allisone+)" },
    { name: "RayScan - Ray", output: "Automatic X-ray Acquisition ✅(Allisone+)" },
    { name: "Romexis - Planmeca", output: "Automatic X-ray Acquisition ✅(Allisone+)", supportedVersions: "Supported versions: ≥ 5.x (paid upgrade)" },
    { name: "Scanora - Soredex", output: "Automatic X-ray Acquisition ✅ (Watcher)" },
    { name: "Sidexis - Sirona", output: "Automatic X-ray Acquisition ✅(Allisone+)", supportedVersions: "Supported versions: ≥ 4.x (XG not supported yet)" },
    { name: "VixWin - Gendex", output: "Automatic Panoramic Acquisition ✅(Allisone+)", supportedVersions: "Supported versions: All versions prior to 4.x" },
    { name: "VistaSoft - Durr Dental", output: "Automatic X-ray Acquisition ✅(Allisone+)", supportedVersions: "Supported versions: 2.x or 3.x" },
    { name: "VisiQuick", output: "Manual X-ray upload ✅" },
];

// Data for PMS
const pmsData = [
    "CC Dentaire",
    "Desmos",
    "Galaxie",
    "Julie",
    "Logosw",
    "SPDentaire",
    "Trophy Carestream",
    "Veasy",
    "WeClever",
];

// Special compatibility combinations
const specialCombinations = {
    Julie: [
        "VistaSoft - Durr Dental",
        "Romexis - Planmeca",
        "Sidexis - Sirona",
        "CS Imaging - Carestream",
        "Ezdent-i - Vatech",
    ],
    Desmos: [
        "VistaSoft - Durr Dental",
        "Romexis - Planmeca",
        "Sidexis - Sirona",
        "CS Imaging - Carestream",
        "Ezdent-i - Vatech",
    ],
    WeClever: [
        "VistaSoft - Durr Dental",
        "Romexis - Planmeca",
        "Sidexis - Sirona",
        "CS Imaging - Carestream",
        "Ezdent-i - Vatech",
    ],
    SPDentaire: [
        "VistaSoft - Durr Dental",
        "Romexis - Planmeca",
        "Sidexis - Sirona",
        "CS Imaging - Carestream",
        "Ezdent-i - Vatech",
    ],
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

    if (!selectedXray && !selectedPms) {
        outputElement.style.display = "none";
        return;
    }

    // Check for special compatibility
    if (selectedXray && selectedPms && specialCombinations[selectedPms]?.includes(selectedXray)) {
        outputElement.textContent = `✅ Fully compatible gateway with X-ray acquisition and synchronisation of report into ${selectedPms} dental scheme`;
        outputElement.style.display = "block";
        addVideoPlaceholdersForPMS(selectedPms); // Add video placeholders for specific PMS
        return;
    }

    // Display modified output for Logosw with specific X-ray software
    if (selectedPms === "Logosw") {
        const logoswGroup1 = [
            "CS Imaging - Carestream",
            "Sidexis - Sirona",
            "Cliniview - KaVo / Instrumentarium",
            "Scanora - Soredex"
        ];

        const logoswGroup2 = [
            "Ezdent-i - Vatech",
            "QuickVision - Owandy",
            "iRYS - MyRay",
            "RayScan - Ray",
            "Examine Pro"
        ];

        const logoswGroup3 = [
            "Romexis - Planmeca",
            "AIS - Acteon",
            "VixWin - Gendex",
            "VistaSoft - Durr Dental",
            "Mediadent",
            "DBSWin - Durr Dental",
            "i-Dixel - Morita"
        ];

        if (logoswGroup1.includes(selectedXray)) {
            outputElement.textContent = "Logosw report synchronisation (full watcher) OR X-ray instant acquisition";
            outputElement.style.display = "block";
            addVideoPlaceholdersForPMS("Logosw"); // Add video placeholders for Logosw and compatible X-ray
            return;
        }

        if (logoswGroup2.includes(selectedXray)) {
            outputElement.textContent = "Logosw report synchronisation (full watcher dicom) OR X-ray instant acquisition";
            outputElement.style.display = "block";
            addVideoPlaceholdersForPMS("Logosw");
            return;
        }

        if (logoswGroup3.includes(selectedXray)) {
            outputElement.textContent = "Logosw report synchronisation (watcher light) OR X-ray instant acquisition";
            outputElement.style.display = "block";
            addVideoPlaceholdersForPMS("Logosw");
            return;
        }
    }

    // Display output for X-ray software only
    if (selectedXray) {
        const xrayOutput = xraySoftwareData.find((software) => software.name === selectedXray)?.output;
        const supportedVersions = xraySoftwareData.find((software) => software.name === selectedXray)?.supportedVersions;
        if (xrayOutput) {
            outputElement.textContent = xrayOutput;
            outputElement.style.display = "block";
            if (supportedVersions) {
                addSecondaryMessage(supportedVersions); // Always show supported versions when X-ray is selected
            }
        }
    } else {
        outputElement.style.display = "none";
    }
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
    let videoPlaceholder = "";

    switch (pms) {
        case "Julie":
            videoPlaceholder = `
                <video controls class="video-placeholder">
                    <source src="Julie_gateway.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            break;
        case "Desmos":
            videoPlaceholder = `
                <video controls class="video-placeholder">
                    <source src="Desmos.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            break;
        case "WeClever":
            videoPlaceholder = `
                <video controls class="video-placeholder">
                    <source src="Weclever.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            break;
        case "SPDentaire":
            videoPlaceholder = `
                <div class="video-placeholder">[Video Placeholder 1 for SPDentaire]</div>
            `;
            break;
        case "Logosw":
            videoPlaceholder = `
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
            videoPlaceholder = `
                <div class="video-placeholder">[General Video Placeholder]</div>
            `;
            break;
    }

    videoContainer.innerHTML = videoPlaceholder;
    outputElement.appendChild(videoContainer);

    // Ensure video elements are responsive
    const videoElements = videoContainer.querySelectorAll("video");
    videoElements.forEach(videoElement => {
        videoElement.style.width = "100%";
        videoElement.style.height = "auto";
    });
}

// Add event listeners for dropdown change
document.getElementById("xraySoftware").addEventListener("change", updateOutput);
document.getElementById("pms").addEventListener("change", updateOutput);