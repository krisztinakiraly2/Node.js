# Az alkalmazás célja

Egy olyan weboldal létrehozása, amiben a felhasználó trackelni tudja tetszőleges projekttel eltöltött idejét. A felhasználó létrehozhat projekteket, time entryket és labeleket. A time entrykhez megjegyzést is lehet fűzni, ami megkönnyíti egy esetleges, későbbi beszámoló megírását. A labelekkel tudja jelezni egy projekt állapotát vagy valamilyen kategóriához való tartozását.
# Az alkalmazás működése

Az oldal megnyitása után a felhasználó az adott hét naptárjával találkozik, ahol napi felbontásban látható, hogy mennyit foglalkozott egy-egy projekttel. Itt hozzá lehet adni projektet az adott héthez, editálni vagy törölni lehet a már meglévő entryket, vagy megjegyzést fűzni ezekhez.

See Weekly view.png

A baloldali menüben lehet váltani a heti és a projekteket összefoglaló nézetek között. A projekt nézetre váltva a projektek felsorolása látható a rajta lévő status, prioritás és egyéb címkékkel.

See Project view.png

Alul található egy gomb, amivel új projektet lehet létrehozni. Erre vagy egy már meglévő projektre kattintva megnyílik egy ablak, ahol az adott projekt adatait lehet szerkeszteni, illetve új esetén kitölteni azokat. Meglévőnél itt akár törölni is lehet azt.

See Project editing view.png
# Entitások felépítése

- Time
	- Date
	- Start time
	- Finish time*
	- Connecting project
	- Notes*

- Project
	- Name
	- Hours spent in total
	- Status*
	- Priority*
	- Tags*
	- Task description*

* *not mandatory to fill out

Figma project:  https://www.figma.com/design/WQOG9FPwh4NhqXK9Eneo3E/Szerver-oldali?node-id=0-1&t=P5ZIegcKyLMZJbSt-1

Fejlesztési lehetőségek:
	- Időmérés
	- Timesheet exportálása excelként
	- Login and users
	- Felugró ablakok új ablakok helyett (add és edit)
	- Titkosítás
	- Külön oldal a statusok, prioritások, tagek editálásának
	- Jobban megvalósított UI
	- Keresés
	- Canban tábla
	- Szűrés és összesítés tag alapján
