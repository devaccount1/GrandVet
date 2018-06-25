var idx = lunr(function () {
  this.field('title')
  this.field('body')

  this.add({
    "title": "Twelfth-Night",
    "body": "If music be the food of love, play on: Give me excess of it…",
    "author": "William Shakespeare",
    "id": "1"
  })
})
var buildSearchResult = function (doc) {
	  var li = document.createElement('li'),
	      article = document.createElement('article'),
	      header = document.createElement('header'),
	      section = document.createElement('section'),
	      h2 = document.createElement('h2'),
	      p = document.createElement('p')

	  h2.dataset.field = 'name'
	  h2.textContent = doc.name

	  p.dataset.field = 'body'
	  p.textContent = doc.body

	  li.appendChild(article)
	  article.appendChild(header)
	  article.appendChild(section)
	  header.appendChild(h2)
	  section.appendChild(p)

	  return li
	}

	var displayQueryError = function (queryText, error) {
	  var message = document.createElement('p'),
	      container = document.querySelector('.query-error')

	  message.classList.add('message')
	  message.textContent = error.message

	  container.appendChild(message)
	}

	var clearQueryError = function () {
	  var container = document.querySelector('.query-error')

	  while (container.firstChild) {
	    container.removeChild(container.firstChild)
	  }
	}

	var searchForm = document.querySelector('#search-form'),
	    searchField = searchForm.querySelector('input')

	searchForm.addEventListener('reset', function (event) {
	  clearQueryError()

	  var ol = document.querySelector('ol')

	  while (ol.firstChild) {
	    ol.removeChild(ol.firstChild)
	  }

	  Object.keys(documents).forEach(function (id) {
	    var doc = documents[id],
	        li = buildSearchResult(doc)

	    ol.appendChild(li)
	  })
	})

	searchForm.addEventListener('submit', function (event) {
	  event.preventDefault()
	  clearQueryError()

	  var query = searchField.value,
	      results = undefined,
	      ol = document.querySelector('ol')

	  try {
	    results = idx.search(query)
	  } catch(e) {
	    if (e instanceof lunr.QueryParseError) {
	      displayQueryError(query, e)
	      return
	    } else {
	      throw e
	    }
	  }

	  while (ol.firstChild) {
	    ol.removeChild(ol.firstChild)
	  }

	  results.forEach(function (result) {
	    var doc = documents[result.ref],
	        li = buildSearchResult(doc)

	    Object.keys(result.matchData.metadata).forEach(function (term) {
	      Object.keys(result.matchData.metadata[term]).forEach(function (fieldName) {
	        var field = li.querySelector('[data-field=' + fieldName + ']'),
	            positions = result.matchData.metadata[term][fieldName].position

	        wrapper(field, positions)
	      })
	    })

	    ol.appendChild(li)
	  })
	})



var JSONdata = [
		{
			"id": "alan_bean",
			"name": "alan bean",
			"body": "Alan Bean was one of the third group of astronauts named by NASA in October 1963. He served as backup astronaut for the Gemini 10 and Apollo 9 missions. Captain Bean was lunar module pilot on Apollo 12, mans second lunar landing. In November 1969, Captain Bean and Captain Pete Conrad landed in the moons Ocean of Stormsafter a flight of some 250,000 miles. They explored the lunar surface, deployed several lunar surface experiments, and installed the first nuclear power generator station on the moon to provide the power source. Captain Richard Gordon remained in lunar orbit photographing landing sites for future missions. Captain Bean was spacecraft commander of Skylab Mission II (SL-3), July 29 to September 25, 1973. With him on the 59-day, 24,400,000 mile world record setting flight were scientist-astronaut Dr. Owen K. Garriott and Marine Corps Lieutenant Colonel Jack R. Lousma. Mission II accomplished 150% of its pre-mission forecast goals. On his next assignment, Captain Bean was backup spacecraft commander of the United States flight crew for the joint American-Russian Apollo-Soyuz Test Project. Captain Bean has logged 1,671 hours and 45 minutes in spaceof which 10 hours and 26 minutes were spent in EVAs on the moon and in earth orbit.\n"
		},
		{
			"id": "alan_shepard",
			"name": "alan shepard",
			"body": "Rear Admiral Shepard was one of the Mercury astronauts named by NASA in April 1959, and he holds the distinction of being the first American to journey into space. On May 5, 1961, in the Freedom 7 spacecraft, he was launched by a Redstone vehicle on a ballistic trajectory suborbital flight--a flight which carried him to an altitude of 116 statute miles and to a landing point 302 statute miles down the Atlantic Missile Range. In 1963, he was designated Chief of the Astronaut Office with responsibility for monitoring the coordination, scheduling, and control of all activities involving NASA astronauts. This included monitoring the development and implementation of effective training programs to assure the flight readiness of available pilot/non-pilot personnel for assignment to crew positions on manned space flights; furnishing pilot evaluations applicable to the design, construction, and operations of spacecraft systems and related equipment; and providing qualitative scientific and engineering observations to facilitate overall mission planning, formulation of feasible operational procedures, and selection and conduct of specific experiments for each flight. He was restored to full flight status in May 1969, following corrective surgery for an inner ear disorder. Shepard made his second space flight as spacecraft commander on Apollo 14, January 31 - February 9, 1971. He was accompanied on man's third lunar landing mission by Stuart A. Roosa, command module pilot, and Edgar D. Mitchell, lunar module pilot. Maneuvering their lunar module, \"Antares,\" to a landing in the hilly upland Fra Mauro region of the moon, Shepard and Mitchell subsequently deployed and activated various scientific equipment and experiments and collected almost 100 pounds of lunar samples for return to earth. Other Apollo 14 achievements included: first use of Mobile Equipment Transporter (MET); largest payload placed in lunar orbit; longest distance traversed on the lunar surface; largest payload returned from the lunar surface; longest lunar surface stay time (33 hours); longest lunar surface EVA (9 hours and 17 minutes); first use of shortened lunar orbit rendezvous techniques; first use of colored TV with new vidicon tube on lunar surface; and first extensive orbital science period conducted during CSM solo operations.\n"
		},
		{
			"id": "buzz_aldrin",
			"name": "buzz aldrin",
			"body": "Aldrin was one of the third group of astronauts named by NASA in October 1963. On November 11, 1966, he and command pilot James Lovell were launched into space in the Gemini 12 spacecraft on a 4-day flight, which brought the Gemini program to a successful close. Aldrin established a new record for extravehicular activity (EVA), spending 5-1/2 hours outside the spacecraft. He served as lunar module pilot for Apollo 11, July 16-24, 1969, the first manned lunar landing mission. Aldrin followed Neil Armstrong onto the lunar surface on July 20, 1969, completing a 2-hour and 15 minute lunar EVA. In July 1971, Aldrin resigned from NASA. Aldrin has logged 289 hours and 53 minutes in space, of which, 7 hours and 52 minutes were spent in EVA.\n"
		},
		{
			"id": "charles_duke",
			"name": "charles duke",
			"body": "Duke was one of the 19 astronauts selected by NASA in April 1966. He served as member of the astronaut support crew for the Apollo 10 flight. He was CAPCOM for Apollo 11, the first landing on the Moon and he served as backup lunar module pilot on Apollo 13. Duke served as lunar module pilot of Apollo 16, April 16-27, 1972. He was accompanied on the fifth manned lunar landing mission by John W. Young (spacecraft commander) and Thomas K. Mattingly II (command module pilot). Apollo 16 was the first scientific expedition to inspect, survey, and sample materials and surface features in the Descartes region of the rugged lunar highlands. Duke and Young commenced their record setting lunar surface stay of 71 hours and 14 minutes by maneuvering the lunar module \"Orion\" to a landing on the rough Cayley Plains. In three subsequent excursions onto the lunar surface, they each logged 20 hours and 15 minutes in extravehicular activities involving the emplacement and activation of scientific equipment and experiments, the collection of nearly 213 pounds of rock and soil samples, and the evaluation and use of Rover-2 over the roughest and blockiest surface yet encountered on the moon. Other Apollo 16 achievements included the largest payload placed in lunar orbit (76, 109 pounds); first cosmic ray detector deployed on lunar surface; first lunar observatory with the far UV camera; and longest in-flight EVA from a command module during transearth coast (1 hour and 13 minutes). The latter feat was accomplished by Mattingly when he ventured out to \"Casper's\" SIM-bay for the retrieval of vital film cassettes from the panoramic and mapping cameras. Apollo 16 concluded with a Pacific Ocean splashdown and subsequent recovery by the USS TICONDEROGA. With the completion of his first space flight, Duke has logged 265 hours in space and over 21 hours of extra vehicular activity. Duke also served as backup lunar module pilot for Apollo 17.\n"
		},
		{
			"id": "david_scott",
			"name": "david scott",
			"body": "Scott was one of the third group of astronauts named by NASA in October 1963. On March 16, 1966, he and command pilot Neil Armstrong were launched into space on the Gemini 8 mission--a flight originally scheduled to last three days but terminated early due to a malfunctioning thruster. The crew performed the first successful docking of two vehicles in space and demonstrated great piloting skill in overcoming the thruster problem and bringing the spacecraft to a safe landing. Scott served as command module pilot for Apollo 9, March 3-13, 1969. This was the third manned flight in the Apollo series, the second to be launched by a Saturn V, and the first to complete a comprehensive earth-orbital qualification and verification test of a \"fully configured Apollo spacecraft.\" The ten-day flight provided vital information previously not available on the operational performance, stability, and reliability of lunar module propulsion and life support systems. Highlight of this evaluation was completion of a critical lunar-orbit rendezvous simulation and subsequent docking, initiated by James McDivitt and Russell Schweickart from within the lunar module at a separation distance which exceeded 100 miles from the command/service module piloted by Scott. The crew also demonstrated and confirmed the operational feasibility of crew transfer and extravehicular activity techniques and equipment, with Schweickart completing a 46-minute EVA outside the lunar module. During this period, Dave Scott completed a 1-hour stand-up EVA in the open command module hatch photographing Schweickart's activities and also retrieving thermal samples from the command module exterior. Apollo 9 splashed down less than four miles from the helicopter carrier USS GUADALCANAL. In his next assignment, Scott was designated backup spacecraft commander for Apollo 12. He made his third space flight as spacecraft commander of Apollo 15, July 26 - August 7, 1971. His companions on the flight were Alfred M. Worden (command module pilot) and James B. Irwin (lunar module pilot). Apollo 15 was the fourth manned lunar landing mission and the first to visit and explore the moon's Hadley Rille and Apennine Mountains which are located on the southeast edge of the Mare Imbrium (Sea of Rains). The lunar module, \"Falcon,\" remained on the lunar surface for 66 hours and 54 minutes (setting a new record for lunar surface stay time) and Scott and Irwin logged 18 hours and 35 minutes each in extravehicular activities conducted during three separate excursions onto the lunar surface. Using \"Rover-1\" to transport themselves and their equipment along portions of Hadley Rille and the Apennine Mountains, Scott and Irwin performed a selenological inspection and survey of the area and collected 180 pounds of lunar surface materials. They deployed an ALSEP package which involved the emplacement and activation of surface experiments, and their lunar surface activities were televised using a TV camera which was operated remotely by ground controllers stationed in the mission control center located at Houston, Texas. Other Apollo 15 achievements include: largest payloads ever placed into earth and lunar orbits; first scientific instrument module bay flown and operated on an Apollo spacecraft; longest distance traversed on lunar surface; first use of a lunar surface navigation device (mounted on Rover-1); first subsatellite launched in lunar orbit; and first extravehicular (EVA) from a command module during transearth coast. The latter feat performed by Worden during three excursions to \"Endeavour's\" SIM-bay where he retrieved film cassettes from the panoramic and mapping cameras and reported his personal observations of the general condition of equipment housed there. Apollo 15 concluded with a Pacific Ocean splashdown and subsequent recovery by the USS OKINAWA.\n"
		},
		{
			"id": "edgar_mitchell",
			"name": "edgar mitchell",
			"body": "Mitchell was a member of Group 5, selected for astronaut training in April 1966. He served as a member of the astronaut support crew for Apollo 9 and as backup lunar module pilot for Apollo 10. On January 31, 1971, serving as lunar module pilot, Dr. Edgar Mitchell, then a U.S. Navy Captain, embarked on a journey through outer space of some 500,000 miles that resulted in becoming the sixth man to walk on the moon. That historic journey terminated safely nine days later on February 9, 1971 and was made in the company of two other men of valor Admiral Alan Shepard and Colonel Stuart Roosa. Maneuvering their lunar module, Antares, to a landing in the hilly upland Fra Mauro region of the moon, Shepard and Mitchell subsequently deployed and activated various scientific equipment and experiments and collected almost 100 pounds of lunar samples for return to Earth. Other Apollo 14 achievements included: first use of Mobile Equipment Transporter (MET); largest payload placed in lunar orbit; longest distance traversed on the lunar surface; largest payload returned from the lunar surface; longest lunar surface stay time (33 hours); longest lunar surface EVA (9 hours and 17 minutes); first use of shortened lunar orbit rendezvous techniques; first use of color TV with new vidicon tube on lunar surface; and first extensive orbital science period conducted during CSM solo operations. In completing his first space flight, Mitchell logged a total of 216 hours and 42 minutes in space. He was subsequently designated to serve as backup lunar module pilot for Apollo 16.\n"
		},
		{
			"id": "eugene_cernan",
			"name": "eugene cernan",
			"body": "Captain Cernan was one of fourteen astronauts selected by NASA in October 1963. He occupied the pilot seat alongside of command pilot Tom Stafford on the Gemini IX mission. During this 3-day flight which Began on June 3, 1966, the spacecraft achieved a circular orbit of 161 statute miles; the crew used three different techniques to effect rendezvous with the previously launched Augmented Target Docking Adapter; and Cernan, the second American to walk in space, logged two hours and ten minutes outside the spacecraft in extravehicular activities. The flight ended after 72 hours and 20 minutes with a perfect re-entry and recovery as Gemini IX landed within 1-1/2 miles of the prime recovery ship USS WASP and 3/8 of a mile from the predetermined target. Cernan subsequently served as backup pilot for Gemini 12 and as backup lunar module pilot for Apollo 7. On his second space flight, he was lunar module pilot of Apollo 10, May 18-26, 1969, the first comprehensive lunar-orbital qualification and verification flight test of an Apollo lunar module. He was accompanied on the 248,000 nautical sojourn to the moon by Thomas P. Stafford (spacecraft commander) and John W. Young (commander module pilot). In accomplishing all of the assigned objectives of this mission, Apollo 10 confirmed the operations performance, stability, and reliability of the command/service module and lunar module configuration during trans-lunar coast, lunar orbit insertion, and lunar module separation and descent to within 8 nautical miles of the lunar surface. The latter maneuver involved employing all but the final minutes of the technique prescribed for use in an actual lunar landing, and allowed critical evaluations of the lunar module propulsions systems and rendezvous of the landing radar devices in subsequent rendezvous and re-docking maneuvers. In addition to demonstrating that man could navigate safely and accurately in the moon's gravitational fields, Apollo 10 photographed and mapped tentative landing sites for future missions. Cernan's next assignment was backup spacecraft commander for Apollo 14. He made his third space flight as spacecraft commander of Apollo 17--the last scheduled manned mission to the moon for the United States--which commenced at 11:33 P.M. (CST), December 6, 1972, with the first manned nighttime launch, and concluded on December 19, 1972. With him on the voyage of the command module \"America\" and the lunar module \"Challenger\" were Ronald Evans (command module pilot) and Harrison H. (Jack) Schmitt (lunar module pilot). In maneuvering \"Challenger\" to a landing at Taurus-Littrow, located on the southeast edge of Mare Serenitatis, Cernan and Schmitt activated a base of operations from which they completed three highly successful excursions to the nearby craters and the Taurus mountains, making the Moon their home for over three days. This last mission to the moon established several new records for manned space flight that include: longest manned lunar landing flight (301 hours 51 minutes); longest lunar surface extravehicular activities (22 hours 6 minutes); largest lunar sample return (an estimated 115 kg (249 lbs.); and longest time in lunar orbit (147 hours 48 minutes). While Cernan and Schmitt conducted activities on the lunar surface, Evans remained in lunar orbit aboard the \"America\" completing assigned work tasks requiring geological observations, handheld photography of specific targets, and the control of cameras and other highly sophisticated scientific equipment carried in the command module SIM-bay. Evans also completed a 1-hour, 6-minute extravehicular activity on the transearth coast phase of the return flight, successfully retrieving three camera cassettes and completing a personal inspection of the equipment bay area. Apollo 17 ended with a splashdown in the Pacific Ocean approximately 0.4 miles from the target point and 4.3 miles form the prime recovery ship USS TICONDEROGA. Captain Cernan was the second American to have walked in space having spanned the circumference of the world twice in a little more than 2-1/2 hours. He was one of the two men to have flown to the moon on two occasions, and as commander of the last mission to the moon, Apollo 17, had the privilege and distinction of being the last man to have left his footprints on the surface of the moon.\n"
		},
		{
			"id": "harrison_schmitt",
			"name": "harrison schmitt",
			"body": "Dr. Schmitt was selected as a scientist-astronaut by NASA in June 1965. He later completed a 53-week course in flight training at Williams Air Force Base, Arizona. In addition to training for future manned space flights. He was instrumental in providing Apollo flight crews with detailed instruction in lunar navigation, geology, and feature recognition. Schmitt also assisted in the integration of scientific activities into the Apollo lunar missions and participated in research activities requiring geologic, petrographic, and stratigraphic analyses of samples returned from the moon by Apollo missions. On his first journey into space, Dr. Schmitt occupied the lunar module pilot seat for Apollo 17 -- the last scheduled manned Apollo mission to the United States --which commenced at 11:33 p.m. (CST), December 6, 1972, and concluded on December 19, 1972. He was accompanied on the voyage of the command module \"America\" and the lunar module \"Challenger\" by Eugene Cernan (spacecraft commander) and Ronald Evans (command module pilot). In maneuvering \"Challenger\" to a landing at Taurus-Littrow, which is located on the southeast edge of Mare Serenitatis, Schmitt and Cernan activated a base of operations facilitating their completion of three days of exploration. This last Apollo mission to the moon for the United States broke several records set by previous flights and include: longest manned lunar landing flight (301 hours, 51 minutes); longest lunar surface extravehicular activities (22 hours, 4 minutes); largest lunar sample return (an estimated 115 Kg, 249 lbs); and longest time in lunar orbit (147 hours, 48 minutes). Apollo 17 ended with a splashdown in the Pacific Ocean approximately 0.4 mile from the target point and 4.3 miles from the prime recovery ship, USS TICONDEROGA.\n"
		},
		{
			"id": "james_irwin",
			"name": "james irwin",
			"body": "Colonel Irwin was one of the 19 astronauts selected by NASA in April 1966. He was crew commander of lunar module (LTA-8)-this vehicle finished the first series of thermal vacuum tests on June 1, 1968. He also served as a member of the astronaut support crew for Apollo 10 and as backup lunar module pilot for the Apollo 12 flight. Irwin served as lunar module pilot for Apollo, July 26 to August 7, 1971. His companions on the flight were David R. Scott, spacecraft commander and Alfred M. Worden, command module pilot. Apollo 15 was the fourth manned lunar landing mission and the first to visit and explore the moon's Hadley Rille and Apennine Mountains which are located on the southeast edge of the Mare Imbrium (Sea of Rains). The lunar module, \"Falcon\", remained on the lunar surface for 66 hours, 54 minutes-setting a new record for lunar surface stay time-and Scott and Irwin logged 18 hours and 35 minutes each in extravehicular activities conducted during three separate excursions onto the lunar surface. Using \"Rover-l\" to transport themselves and their equipment along portions of Hadley Rille and the Apinnine Mountains, Scott and Irwin performed a selenological inspection and survey of the area and collected approximately 180 pounds of lunar surface materials. They deployed an ALSEP package which involved the emplacement and activation of surface experiments, and their lunar surface activities were televised in color using a TV camera which was operated remotely by ground controllers stationed in the mission control center located at Houston, Texas. Other Apollo 15 achievements included: largest payloads ever placed in earth and lunar orbits; first scientific instrument module bay flown and operated on an Apollo spacecraft; longest distance traversed on lunar surface; first use of a lunar surface navigation device, mounted on Rover 1; first subsatellite launched in lunar orbit; and first extravehicular activity (EVA) from a command module during transearth coast. The latter feat was accomplished by Worden during three excursions to \"Endeavour's\" SIM bay where he retrieved film cassettes from the panoramic and mapping cameras and reported his personal observations of the general condition of equipment housed there. Apollo 15 concluded with a Pacific splashdown and subsequent recovery by the USS OKINAWA.\n"
		},
		{
			"id": "john_young",
			"name": "john young",
			"body": "In September 1962, Young was selected as an astronaut. He is the first person to fly in space six times from earth, and seven times counting his lunar liftoff. The first flight was with Gus Grissom in Gemini 3, the first manned Gemini mission, on March 23, 1965. This was a complete end-to-end test of the Gemini spacecraft, during which Gus accomplished the first manual change of orbit altitude and plane and the first lifting reentry, and Young operated the first computer on a manned spacecraft. On Gemini 10, July 18-21, 1966, Young, as Commander, and Mike Collins, as Pilot, completed a dual rendezvous with two separate Agena target vehicles. While Young flew close formation on the second Agena, Mike Collins did an extravehicular transfer to retrieve a micro meteorite detector from that Agena. On his third flight, May 18-26, 1969, Young was Command Module Pilot of Apollo 10. Tom Stafford and Gene Cernan were also on this mission which orbited the Moon, completed a lunar rendezvous, and tracked proposed lunar landing sites. His fourth space flight, Apollo 16, April 16-27, 1972, was a lunar exploration mission, with Young as Spacecraft Commander, and Ken Mattingly and Charlie Duke. Young and Duke set up scientific equipment and explored the lunar highlands at Descartes. They collected 200 pounds of rocks and drove over 16 miles in the lunar rover on three separate geology traverses. Young’s fifth flight was as Spacecraft Commander of STS-1, the first flight of the Space Shuttle, April 12-14, 1981, with Bob Crippen as Pilot. The 54-1/2 hour, 36-orbit mission verified Space Shuttle systems performance during launch, on orbit, and entry. Tests of the Orbiter Columbia included evaluation of mechanical systems including the payload bay doors, the attitude and maneuvering rocket thrusters, guidance and navigation systems, and Orbiter/crew compatibility. One hundred and thirty three of the mission’s flight test objectives were accomplished. The Orbiter Columbia was the first manned spaceship tested during ascent, on orbit, and entry without benefit of previous unmanned missions. Columbia was also the first winged reentry vehicle to return from space to a runway landing. It weighed about 98 tons as Young landed it on the dry lakebed at Edwards Air Force Base, California. Young’s sixth flight was as Spacecraft Commander of STS-9, the first Spacelab mission, November 28-December 8, 1983, with Pilot Brewster Shaw, Mission Specialists Bob Parker and Owen Garriott, and Payload Specialists Byron Lichtenberg of the USA and Ulf Merbold of West Germany. The mission successfully completed all 94 of its flight test objectives. For ten days the 6-man crew worked 12-hour shifts around-the-clock, performing more than 70 experiments in the fields of atmospheric physics, Earth observations, space plasma physics, astronomy and solar physics, materials processing and life sciences. The mission returned more scientific and technical data than all the previous Apollo and Skylab missions put together. The Spacelab was brought back for re-use, so that Columbia weighed over 110 tons as Young landed the spaceship at Edwards Air Force Base, California.\n"
		},
		{
			"id": "neil_armstrong",
			"name": "neil armstrong",
			"body": "As a research pilot at NASA’s Flight Research Center, Edwards, California, Armstrong was a project pilot on many pioneering high speed aircraft, including the well known, 4000-mph X-15. He flew more than 200 different models of aircraft, including jets, rockets, helicopters and gliders. Armstrong transferred to astronaut status in 1962. He was assigned as command pilot for the Gemini 8 mission. Gemini 8 was launched on March 16, 1966, and Armstrong performed the first successful docking of two vehicles in space. As spacecraft commander for Apollo 11, the first manned lunar landing mission, Armstrong gained the distinction of being the first man to land a craft on the moon and first to step on its surface. Armstrong subsequently held the position of Deputy Associate Administrator for Aeronautics, NASA Headquarters, Washington, D.C. In this position, he was responsible for the coordination and management of overall NASA research and technology work related to aeronautics.\n"
		},
		{
			"id": "pete_conrad",
			"name": "pete conrad",
			"body": "In September of 1962, Mr. Conrad was selected as an astronaut by NASA. His first flight was Gemini V, which established the space endurance record and placed the United States in the lead for man-hours in space. As commander of Gemini XI, Mr. Conrad helped to set a world's altitude record. He then served as commander of Apollo XII, the second lunar landing. On Mr. Conrad's final mission, he served as commander of Skylab II, the first United States Space Station. In December 1973, after serving 20 years (11 of which were as an astronaut in the space program), Mr. Conrad retired from the U.S. Navy to accept a position as Vice President - Operations and Chief Operating Office of American Television and Communications Corporation (ATC). At ATC, he was responsible for both the operation of existing systems and the national development of new cable television systems. In 1976, he resigned from ATC to accept the position of Vice President and consultant to McDonnell Douglas Corporation. In 1978, he became Vice President of marketing and was responsible for all commercial and military sales for Douglas Aircraft Company. Mr. Conrad then became Senior Vice President-Marketing in 1980. He was appointed as Senior Vice President Marketing and Product Support in 1982 and 1984, was named Staff Vice President of International Business Development for McDonnell Douglas Corporation.\n"
		}
	];