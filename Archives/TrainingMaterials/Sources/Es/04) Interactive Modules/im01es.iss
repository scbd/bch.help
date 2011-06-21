; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define InstallRoot "Entrenamiento UNEP-GEF"
#define InstallClass "Modulos Interactivos del CIISB"
#define InstallLanguage "English"
#define MyAppName "Introducción al Protocolo de Cartagena sobre Seguridad de la Biotecnología"
#define MyAppSinTildes "Introduccion al Protocolo de Cartagena sobre Seguridad de la Biotecnologia"
#define MyAppVerName "Introducción al Protocolo de Cartagena sobre Seguridad de la Biotecnología"
#define MyAppPublisher "PNUMA-FMAM"
#define MyAppURL "moodle.unep.ch"
#define MyAppExeName "flashplayer_10_sa.exe"
#define MovieFile "pilot_user1_1.swf"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{94A55D15-A301-4E77-BCBC-AC05BB9FDC71}
AppName={#MyAppName}
AppVerName={#MyAppVerName}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={localappdata}\{#InstallRoot}\{#MyAppSinTildes}
DefaultGroupName={#InstallRoot}\{#MyAppSinTildes}
OutputBaseFilename=IM01Es
Compression=lzma
SolidCompression=true
OutputDir=Compiled
AlwaysUsePersonalGroup=true
WizardImageFile=imagencostado.bmp
WizardSmallImageFile=miniimagen.bmp
DisableDirPage=true
EnableDirDoesntExistWarning=true
DisableProgramGroupPage=true
RestartIfNeededByRun=false
LicenseFile=DisclaimerEs.rtf
PrivilegesRequired=lowest

[Languages]
Name: spanish; MessagesFile: compiler:Languages\Spanish.isl

[Tasks]
Name: desktopicon; Description: {cm:CreateDesktopIcon}; GroupDescription: {cm:AdditionalIcons};  

[Files]
Source: Files1\*; DestDir: {app}; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files
;Source: install_flash_player_active_x.exe; DestDir: {app}

[Icons]
Name: {group}\{#MyAppName}; Filename: {app}\{#MyAppExeName}; Parameters: {#MovieFile}; Flags: runmaximized; IconFilename: {app}\BCH_ICON.ico;
Name: {group}\{cm:UninstallProgram,{#MyAppName}}; Filename: {uninstallexe}
Name: {userdesktop}\{#MyAppName}; Filename: {app}\{#MyAppExeName}; Parameters: {#MovieFile}; Flags: runmaximized; Tasks: desktopicon; IconFilename: {app}\BCH_ICON.ico;

[Run]
Filename: {app}\{#MyAppExeName}; Parameters: {#MovieFile}; Description: {cm:LaunchProgram,{#MyAppName}}; Flags: runmaximized nowait postinstall runascurrentuser skipifsilent
;Filename: {app}\install_flash_player_active_x.exe; Parameters: /s; StatusMsg: Instalando Flash Player...
