# Diff Details

Date : 2024-04-27 23:14:35

Directory /Users/rock/Documents/Projekti/2dGame/client/src

Total : 38 files,  758 codes, -21 comments, 106 blanks, all 843 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [client/src/Classes/AnimationLoop.ts](/client/src/Classes/AnimationLoop.ts) | TypeScript | -25 | -1 | -8 | -34 |
| [client/src/Classes/EnemyAi.ts](/client/src/Classes/EnemyAi.ts) | TypeScript | -164 | -6 | -20 | -190 |
| [client/src/Classes/EnemySpawner.ts](/client/src/Classes/EnemySpawner.ts) | TypeScript | -134 | 0 | -16 | -150 |
| [client/src/Classes/Hud.ts](/client/src/Classes/Hud.ts) | TypeScript | -184 | -12 | -23 | -219 |
| [client/src/Classes/InGameMenu.ts](/client/src/Classes/InGameMenu.ts) | TypeScript | -243 | 0 | -19 | -262 |
| [client/src/Classes/LevelImages.ts](/client/src/Classes/LevelImages.ts) | TypeScript | -20 | -7 | -8 | -35 |
| [client/src/Classes/Player.ts](/client/src/Classes/Player.ts) | TypeScript | -283 | -6 | -24 | -313 |
| [client/src/Classes/PlayerInput.ts](/client/src/Classes/PlayerInput.ts) | TypeScript | -79 | -9 | -12 | -100 |
| [client/src/Classes/PlayerSpells.ts](/client/src/Classes/PlayerSpells.ts) | TypeScript | -229 | -14 | -33 | -276 |
| [client/src/Classes/PowerUp.ts](/client/src/Classes/PowerUp.ts) | TypeScript | -215 | -2 | -25 | -242 |
| [client/src/Classes/Projectile.ts](/client/src/Classes/Projectile.ts) | TypeScript | -224 | -2 | -31 | -257 |
| [client/src/Classes/Sprite.ts](/client/src/Classes/Sprite.ts) | TypeScript | -30 | -9 | -6 | -45 |
| [client/src/Classes/Vector.ts](/client/src/Classes/Vector.ts) | TypeScript | -8 | 0 | -1 | -9 |
| [client/src/Classes/tests/powerUp.test.js](/client/src/Classes/tests/powerUp.test.js) | JavaScript | -7 | -3 | -2 | -12 |
| [client/src/Classes/tests/projectile.test.js](/client/src/Classes/tests/projectile.test.js) | JavaScript | 0 | -24 | -1 | -25 |
| [client/src/Level/LevelLogic/Enemy/Asteroid.ts](/client/src/Level/LevelLogic/Enemy/Asteroid.ts) | TypeScript | 78 | 0 | 14 | 92 |
| [client/src/Level/LevelLogic/Enemy/Enemy.ts](/client/src/Level/LevelLogic/Enemy/Enemy.ts) | TypeScript | 180 | 6 | 22 | 208 |
| [client/src/Level/LevelLogic/Enemy/EnemyBoss.ts](/client/src/Level/LevelLogic/Enemy/EnemyBoss.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [client/src/Level/LevelLogic/Enemy/EnemySpawner.ts](/client/src/Level/LevelLogic/Enemy/EnemySpawner.ts) | TypeScript | 237 | 3 | 43 | 283 |
| [client/src/Level/LevelLogic/Game UI/Hud.ts](/client/src/Level/LevelLogic/Game%20UI/Hud.ts) | TypeScript | 205 | 12 | 29 | 246 |
| [client/src/Level/LevelLogic/Game UI/InGameMenu.ts](/client/src/Level/LevelLogic/Game%20UI/InGameMenu.ts) | TypeScript | 239 | 0 | 19 | 258 |
| [client/src/Level/LevelLogic/Game UI/PowerUp.ts](/client/src/Level/LevelLogic/Game%20UI/PowerUp.ts) | TypeScript | 251 | 3 | 33 | 287 |
| [client/src/Level/LevelLogic/Other/AnimationLoop.ts](/client/src/Level/LevelLogic/Other/AnimationLoop.ts) | TypeScript | 25 | 1 | 8 | 34 |
| [client/src/Level/LevelLogic/Other/canvasLogic.ts](/client/src/Level/LevelLogic/Other/canvasLogic.ts) | TypeScript | 30 | 33 | 9 | 72 |
| [client/src/Level/LevelLogic/Player/Player.ts](/client/src/Level/LevelLogic/Player/Player.ts) | TypeScript | 229 | 2 | 22 | 253 |
| [client/src/Level/LevelLogic/Player/PlayerInput.ts](/client/src/Level/LevelLogic/Player/PlayerInput.ts) | TypeScript | 189 | 14 | 17 | 220 |
| [client/src/Level/LevelLogic/Player/PlayerSpells.ts](/client/src/Level/LevelLogic/Player/PlayerSpells.ts) | TypeScript | 395 | 8 | 57 | 460 |
| [client/src/Level/LevelLogic/Player/Projectile.ts](/client/src/Level/LevelLogic/Player/Projectile.ts) | TypeScript | 220 | 2 | 30 | 252 |
| [client/src/Level/LevelLogic/Sprite/LevelImages.ts](/client/src/Level/LevelLogic/Sprite/LevelImages.ts) | TypeScript | 20 | 7 | 8 | 35 |
| [client/src/Level/LevelLogic/Sprite/Sprite.ts](/client/src/Level/LevelLogic/Sprite/Sprite.ts) | TypeScript | 30 | 9 | 6 | 45 |
| [client/src/Level/LevelLogic/Sprite/Vector.ts](/client/src/Level/LevelLogic/Sprite/Vector.ts) | TypeScript | 8 | 0 | 1 | 9 |
| [client/src/Level/LevelLogic/canvasLogic.ts](/client/src/Level/LevelLogic/canvasLogic.ts) | TypeScript | -41 | -33 | -11 | -85 |
| [client/src/Level/LevelLogic/mainLevelLogic.ts](/client/src/Level/LevelLogic/mainLevelLogic.ts) | TypeScript | 13 | 5 | 1 | 19 |
| [client/src/Level/LevelLogic/spaceshipLogic.ts](/client/src/Level/LevelLogic/spaceshipLogic.ts) | TypeScript | -70 | 0 | -5 | -75 |
| [client/src/Level/levelGenerator.ts](/client/src/Level/levelGenerator.ts) | TypeScript | 5 | 0 | 3 | 8 |
| [client/src/Level/levelStyling.css](/client/src/Level/levelStyling.css) | CSS | 325 | 2 | 23 | 350 |
| [client/src/Utils/OftenUsed.ts](/client/src/Utils/OftenUsed.ts) | TypeScript | 13 | 0 | 3 | 16 |
| [client/src/Utils/TsTypes.ts](/client/src/Utils/TsTypes.ts) | TypeScript | 9 | 0 | 1 | 10 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details