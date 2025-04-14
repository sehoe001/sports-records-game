const express = require('express');
const cors = require('cors');

// Sample players data (in a real app, this would come from a database)
const players = [
  // NBA - Current
  "LeBron James", "Stephen Curry", "Kevin Durant", "Giannis Antetokounmpo", "Luka Doncic",
  "Joel Embiid", "Nikola Jokic", "Ja Morant", "Jayson Tatum", "Devin Booker",
  "Damian Lillard", "Trae Young", "Donovan Mitchell", "Anthony Davis", "Karl-Anthony Towns",
  "Jimmy Butler", "Paul George", "Kyrie Irving", "James Harden", "Russell Westbrook",
  "Kawhi Leonard", "Zion Williamson", "Draymond Green", "Klay Thompson", "DeMar DeRozan",
  // NBA - Historical
  "Michael Jordan", "Kobe Bryant", "Wilt Chamberlain", "Kareem Abdul-Jabbar", "Larry Bird",
  "Magic Johnson", "Bill Russell", "Tim Duncan", "Shaquille O'Neal", "Hakeem Olajuwon",
  "Charles Barkley", "Karl Malone", "Allen Iverson", "David Robinson", "Patrick Ewing",
  "Julius Erving", "Oscar Robertson", "Jerry West", "Scottie Pippen", "John Stockton",
  "Dirk Nowitzki", "Kevin Garnett", "Dominique Wilkins", "Isiah Thomas", "Chris Mullin",
  // NFL - Current
  "Patrick Mahomes", "Josh Allen", "Lamar Jackson", "Justin Jefferson", "Travis Kelce",
  "Aaron Donald", "Nick Bosa", "Micah Parsons", "Jalen Hurts", "Christian McCaffrey",
  "Tyreek Hill", "Davante Adams", "T.J. Watt", "Myles Garrett", "Derrick Henry",
  "Justin Herbert", "Joe Burrow", "Tua Tagovailoa", "Saquon Barkley", "Nick Chubb",
  "Cooper Kupp", "Stefon Diggs", "CeeDee Lamb", "George Kittle", "Ja'Marr Chase",
  // NFL - Historical
  "Tom Brady", "Jerry Rice", "Lawrence Taylor", "Joe Montana", "Barry Sanders",
  "Peyton Manning", "Ray Lewis", "Deion Sanders", "Randy Moss", "Emmitt Smith",
  "Walter Payton", "Dan Marino", "John Elway", "Brett Favre", "Ray Rice",
  "Adrian Peterson", "Calvin Johnson", "Tony Gonzalez", "Reggie White", "Dick Butkus",
  "Jim Brown", "Roger Staubach", "Johnny Unitas", "Bruce Smith", "Marshall Faulk",
  // MLB - Current
  "Mike Trout", "Shohei Ohtani", "Aaron Judge", "Mookie Betts", "Juan Soto",
  "Ronald Acuna Jr.", "Freddie Freeman", "Trea Turner", "Jacob deGrom", "Gerrit Cole",
  "Giancarlo Stanton", "Bryce Harper", "Jose Altuve", "Carlos Correa", "Francisco Lindor",
  "Fernando Tatis Jr.", "Pete Alonso", "Yordan Alvarez", "Julio Rodriguez", "Sandy Alcantara",
  "Max Scherzer", "Justin Verlander", "Paul Goldschmidt", "Jose Ramirez", "Rafael Devers",
  // MLB - Historical
  "Barry Bonds", "Babe Ruth", "Hank Aaron", "Willie Mays", "Ken Griffey Jr.",
  "Derek Jeter", "Pedro Martinez", "Randy Johnson", "Greg Maddux", "Nolan Ryan",
  "Ted Williams", "Mickey Mantle", "Stan Musial", "Lou Gehrig", "Cy Young",
  "Jackie Robinson", "Roberto Clemente", "Yogi Berra", "Sandy Koufax", "Willie McCovey",
  "Mike Schmidt", "Rickey Henderson", "Cal Ripken Jr.", "Tony Gwynn", "Frank Thomas",
  // NHL - Current
  "Connor McDavid", "Nathan MacKinnon", "Auston Matthews", "Leon Draisaitl", "Cale Makar",
  "Sidney Crosby", "Alexander Ovechkin", "Nikita Kucherov", "David Pastrnak", "Jack Hughes",
  "Artemi Panarin", "Mikko Rantanen", "Matthew Tkachuk", "Kirill Kaprizov", "Mitch Marner",
  "Victor Hedman", "Roman Josi", "Igor Shesterkin", "Adam Fox", "Jason Robertson",
  "Johnny Gaudreau", "Patrick Kane", "Jonathan Huberdeau", "Brad Marchand", "Elias Pettersson",
  // NHL - Historical
  "Wayne Gretzky", "Gordie Howe", "Mario Lemieux", "Bobby Orr", "Mark Messier",
  "Patrick Roy", "Brett Hull", "Steve Yzerman", "Maurice Richard", "Bobby Hull",
  "Jean Beliveau", "Phil Esposito", "Ray Bourque", "Martin Brodeur", "Joe Sakic",
  "Bobby Clarke", "Denis Potvin", "Guy Lafleur", "Marcel Dionne", "Mike Bossy",
  "Chris Chelios", "Jaromir Jagr", "Dominik Hasek", "Nicklas Lidstrom", "Pavel Bure"
];

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Collection of single-season sports records questions
const sportsRecords = [
  {
    answer: "adrian peterson",
    question: "Who had the most rushing yards in the 2012 NFL season?",
    clues: [
      "I rushed for the most yards in the 2012 NFL season",
      "I played for the Minnesota Vikings",
      "I was named NFL MVP this year",
      "I finished with 2,097 rushing yards",
      "🏈 I averaged 6.0 yards per carry and came back from an ACL injury"
    ]
  },
  {
    answer: "stephen curry",
    question: "Who made the most 3-pointers in the 2015-16 NBA season?",
    clues: [
      "I made the most three-pointers in the 2015-16 NBA season",
      "I played for the Golden State Warriors",
      "I was unanimously named MVP this year",
      "I set a record with 402 three-pointers",
      "🏀 My team won an NBA record 73 regular season games"
    ]
  },
  {
    answer: "aaron judge",
    question: "Who hit the most home runs in the 2022 MLB season?",
    clues: [
      "I hit the most home runs in the 2022 MLB season",
      "I played for the New York Yankees",
      "I broke the American League record",
      "I finished with 62 home runs",
      "⚾ I also won the AL MVP and led in RBIs and runs scored"
    ]
  },
  {
    answer: "cooper kupp",
    question: "Who had the most receiving yards in the 2021 NFL season?",
    clues: [
      "I had the most receiving yards in the 2021 NFL season",
      "I played for the Los Angeles Rams",
      "I won the receiving triple crown",
      "I finished with 1,947 receiving yards",
      "🏈 I led the league with 16 TDs and won Super Bowl MVP"
    ]
  },
  {
    answer: "connor mcdavid",
    question: "Who scored the most points in the 2022-23 NHL season?",
    clues: [
      "I scored the most points in the 2022-23 NHL season",
      "I played for the Edmonton Oilers",
      "I won the Art Ross Trophy",
      "I finished with 153 total points",
      "🏒 I had 64 goals and 89 assists for the season"
    ]
  },
  {
    answer: "joel embiid",
    question: "Who won the NBA scoring title in the 2022-23 season?",
    clues: [
      "I won the NBA scoring title in the 2022-23 season",
      "I played for the Philadelphia 76ers",
      "This was my first scoring title",
      "I averaged 33.1 points per game",
      "🏀 I was named league MVP and averaged 10.2 rebounds"
    ]
  }
];

// Current game data
let currentGame = null;

// Function to select a random game
function selectNewGame() {
  const randomIndex = Math.floor(Math.random() * sportsRecords.length);
  currentGame = sportsRecords[randomIndex];
  return currentGame;
}

// Initialize the first game
selectNewGame();

app.get('/api/clue/:attempt', (req, res) => {
  const attemptNumber = parseInt(req.params.attempt);
  if (attemptNumber >= 0 && attemptNumber < currentGame.clues.length) {
    res.json({
      clue: currentGame.clues[attemptNumber],
      question: currentGame.question
    });
  } else {
    res.status(400).json({ error: 'Invalid attempt number' });
  }
});

app.post('/api/guess', (req, res) => {
  const { guess } = req.body;
  const correct = guess.toLowerCase() === currentGame.answer.toLowerCase();
  res.json({ correct });
});

// Endpoint to start a new game
app.post('/api/new-game', (req, res) => {
  selectNewGame();
  res.json({ success: true });
});

// Endpoint for player name autocomplete
app.get('/api/players/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const matches = players.filter(player => 
    player.toLowerCase().includes(query)
  )
  .sort((a, b) => {
    // Prioritize matches that start with the query
    const aStartsWith = a.toLowerCase().startsWith(query);
    const bStartsWith = b.toLowerCase().startsWith(query);
    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    return a.localeCompare(b);
  })
  .slice(0, 10); // Limit to 10 results
  res.json({ matches });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
