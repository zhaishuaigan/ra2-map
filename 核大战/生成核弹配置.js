
function 生成核弹建筑代码(生成数量) {
    var 建筑注册 = "[BuildingTypes]\n";
    var 武器注册 = "[SuperWeaponTypes]\n";
    var 单位代码 = "";
    var 建造前提 = "";
    var 核弹建筑注册名 = "";
    var 超级武器注册名 = "";
    for (var i = 1; i <= 生成数量; i++) {
        核弹建筑注册名 = `N${i}`;
        超级武器注册名 = `NS${i}`;

        建筑注册 += (500 + i) + "=" + 核弹建筑注册名 + "\n";
        武器注册 += (500 + i) + "=" + 超级武器注册名 + "\n";
        if (i == 1) {
            建造前提 = "CAMSC06";
        } else {
            建造前提 += `,N${i - 1}`;
        }
        单位代码 += `
[${核弹建筑注册名}]
Cost=1000
Name=Soviet Nuclear Missile Silo
Armor=concrete
Image=NAMISL
Owner=British,French,Germans,Americans,Alliance,Russians,Confederation,Africans,Arabs,YuriCountry
Power=0
Sight=4
Crewed=no
Points=30
UIName=Name:NAMISL
Nominal=yes
Spyable=yes
Adjacent=2
BuildCat=Tech
NukeSilo=yes
Strength=1000
Explosion=TWLT070,S_BANG48,S_BRNL58,S_CLSN58,S_TUMU60
MaxDebris=15
MinDebris=5
TechLevel=10
BuildLimit=1
Capturable=false
DamageSelf=yes
DebrisAnim=Dbris3sm,Dbris4lg,Dbris4sm,Dbris6sm,Dbris7lg,Dbris7sm,Dbris8sm,Dbris9lg,Dbris10lg,Dbris10sm
AIBuildThis=yes
RevealToAll=yes
SuperWeapon=${超级武器注册名}
ThreatPosed=0
Prerequisite=${建造前提}
Prerequisite.Negative=${核弹建筑注册名}
ChargedAnimTime=1
ProtectWithWall=yes
AIBasePlanningSide=1
HasStupidGuardMode=false
SpecialThreatValue=1
DamageParticleSystems=SparkSys,LGSparkSys

[${超级武器注册名}]
Name=N U K E !!!
Type=MultiMissile
Range=7
Action=Nuke
UIName=Name:Nuke
IsPowered=true
ShowTimer=no
WeaponType=NukeCarrier
RechargeTime=10
SidebarImage=NukeIcon
SuspendVoice=
ChargingVoice=
RechargeVoice=00-I154
ImpatientVoice=
LineMultiplier=2
AIDefendAgainst=yes
DisableableFromShell=no
SW.FireIntoShroud=no
Money.Amount=1000

`;
    }
    return 建筑注册 + 武器注册 + 单位代码;

}

var 代码 = 生成核弹建筑代码(50);
var fs = require("fs");
fs.writeFileSync("./assets/NAMISL.ini", 代码);
