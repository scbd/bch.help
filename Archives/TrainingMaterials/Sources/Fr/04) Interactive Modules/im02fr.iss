; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define InstallRoot "PNUE-FEM Entrainement"
#define InstallClass "Modules Interactives CEPRB"
#define InstallLanguage "French"
#define MyAppName "Initiation au CEPRB"
#define MyAppNameSinTildes "Initiation au CEPRB"
#define MyAppVerName "Initiation au CEPRB"
#define MyAppPublisher "PNUE-FEM"
#define MyAppURL "moodle.unep.ch"
#define MyAppExeName "flashplayer_10_sa.exe"
#define MovieFile "pilot_user1_2.swf"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{16AB7530-D5F2-497C-A7FE-0F21F408C6B1}
AppName={#MyAppName}
AppVerName={#MyAppVerName}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={localappdata}\{#InstallRoot}\{#MyAppName}
DefaultGroupName={#InstallRoot}\{#MyAppName}
OutputBaseFilename=IM02Fr
Compression=lzma
SolidCompression=true
OutputDir=Compiled
AlwaysUsePersonalGroup=true
WizardImageFile=imagencostado.bmp
WizardSmallImageFile=miniimagen.bmp
DisableDirPage=true
EnableDirDoesntExistWarning=true
DisableProgramGroupPage=true
LicenseFile=DisclaimerFr.rtf
RestartIfNeededByRun=false
PrivilegesRequired=lowest

[Languages]
Name: french; MessagesFile: compiler:Languages\French.isl

[Tasks]
Name: desktopicon; Description: {cm:CreateDesktopIcon}; GroupDescription: {cm:AdditionalIcons}; 

[Files]
Source: Files2\*; DestDir: {app}; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files
;Source: install_flash_player_active_x.exe; DestDir: {app}

[Icons]
Name: {group}\{#MyAppName}; Filename: {app}\{#MyAppExeName}; Parameters: {#MovieFile}; Flags: runmaximized; IconFilename: {app}\BCH_ICON.ico;
Name: {group}\{cm:UninstallProgram,{#MyAppName}}; Filename: {uninstallexe}
Name: {userdesktop}\{#MyAppName}; Filename: {app}\{#MyAppExeName}; Parameters: {#MovieFile}; Flags: runmaximized; Tasks: desktopicon; IconFilename: {app}\BCH_ICON.ico;

[Run]
Filename: {app}\{#MyAppExeName}; Parameters: {#MovieFile}; Description: {cm:LaunchProgram,{#MyAppName}}; Flags: runmaximized nowait postinstall runascurrentuser skipifsilent
;Filename: {app}\install_flash_player_active_x.exe; Tasks: ; Languages: ; Parameters: /s; StatusMsg: En train d'installer Flash Player...
