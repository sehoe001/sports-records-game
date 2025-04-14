// Game data
let gameCounter = 0;

// Initialize worker state
const initializeWorkerState = (env) => {
  if (!env.CURRENT_GAME) {
    env.CURRENT_GAME = JSON.stringify({});
  }
};

// Players list
const players = [
  // Current Players
  "Aaron Judge",
  "Adrian Peterson",
  "Barry Bonds",
  "Christian McCaffrey",
  "Connor McDavid",
  "Derrick Henry",
  "Giannis Antetokounmpo",
  "Joel Embiid",
  "Kevin Durant",
  "LeBron James",
  "Luka Doncic",
  "Patrick Mahomes",
  "Shohei Ohtani",
  "Stephen Curry",
  "Tom Brady",
  "Travis Kelce",
  
  // Historical Players
  "Babe Ruth",
  "Jerry Rice",
  "Joe Montana",
  "Kareem Abdul-Jabbar",
  "Ken Griffey Jr.",
  "Larry Bird",
  "Magic Johnson",
  "Mario Lemieux",
  "Michael Jordan",
  "Muhammad Ali",
  "Peyton Manning",
  "Serena Williams",
  "Tiger Woods",
  "Wayne Gretzky",
  "Wilt Chamberlain",
  "Alex Ovechkin",
  "Derek Jeter",
  "Kobe Bryant",
  "Mike Trout",
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Roger Federer",
  "Michael Phelps",
  "Usain Bolt",
  "Pele",
  "Willie Mays",
  "Roberto Clemente",
  "Ty Cobb"
];

// Normalize the answers to match the player list exactly
const findExactPlayer = (answer) => {
  if (!answer) {
    console.error('Invalid answer:', answer);
    return null;
  }

  // First try exact match
  const exactMatch = players.find(p => p === answer);
  if (exactMatch) {
    console.log('Found exact match:', exactMatch);
    return exactMatch;
  }
  
  // Try case-insensitive match
  const normalizedMatch = players.find(p => p.toLowerCase() === answer.toLowerCase());
  if (normalizedMatch) {
    console.log('Found case-insensitive match:', normalizedMatch);
    return normalizedMatch;
  }
  
  console.error('Player not found in list:', answer);
  return answer;
};

const sportsRecords = [
  {
    answer: findExactPlayer("Adrian Peterson"),
    question: "Who had the most rushing yards in the 2012 NFL season?",
    clues: [
      "In football, I set the record for rushing yards in the 2012 season",
      "I played for the Minnesota Vikings",
      "I was named MVP after returning from an ACL injury",
      "I rushed for 2,097 yards in 2012",
      "🏈 I averaged 6.0 yards per carry in 2012"
    ]
  },
  {
    answer: findExactPlayer("Aaron Judge"),
    question: "Who hit 62 home runs in the 2022 MLB season?",
    clues: [
      "In baseball, I set the record for home runs in the 2022 season",
      "I played for the New York Yankees",
      "I was named MVP and broke Roger Maris' record",
      "I hit 62 home runs in 2022",
      "⚾ I also led the league in RBIs and runs in 2022"
    ]
  },
  {
    answer: findExactPlayer("Stephen Curry"),
    question: "Who made 402 three-pointers in the 2015-16 NBA season?",
    clues: [
      "In basketball, I set the record for three-pointers in the 2015-16 season",
      "I played for the Golden State Warriors",
      "I was unanimously named MVP this season",
      "I made 402 three-pointers in 2015-16",
      "🏀 My team won a record 73 games in 2015-16"
    ]
  },
  {
    answer: findExactPlayer("Wayne Gretzky"),
    question: "Who scored 215 points in the 1985-86 NHL season?",
    clues: [
      "In hockey, I set the record for points in the 1985-86 season",
      "I played for the Edmonton Oilers",
      "I won the Hart Trophy as league MVP",
      "I scored 215 points in 1985-86",
      "🏒 I had 163 assists in 1985-86, also a record"
    ]
  },
  {
    answer: findExactPlayer("Michael Jordan"),
    question: "Who averaged 37.1 points in the 1986-87 NBA season?",
    clues: [
      "In basketball, I set the record for scoring in the 1986-87 season",
      "I played for the Chicago Bulls",
      "I won the scoring title this season",
      "I averaged 37.1 points per game in 1986-87",
      "🏀 I scored 3,041 points in 1986-87"
    ]
  },
  {
    answer: findExactPlayer("Tom Brady"),
    question: "Who threw 50 touchdown passes in the 2007 NFL season?",
    clues: [
      "In football, I set the record for touchdown passes in the 2007 season",
      "I played for the New England Patriots",
      "I was named MVP in an undefeated regular season",
      "I threw 50 touchdown passes in 2007",
      "🏈 I led my team to a 16-0 record in 2007"
    ]
  },
  {
    answer: findExactPlayer("Barry Bonds"),
    question: "Who hit 73 home runs in the 2001 MLB season?",
    clues: [
      "In baseball, I set the record for home runs in the 2001 season",
      "I played for the San Francisco Giants",
      "I was named MVP with a .863 slugging percentage",
      "I hit 73 home runs in 2001",
      "⚾ I was walked 177 times in 2001"
    ]
  },
  {
    answer: findExactPlayer("Wilt Chamberlain"),
    question: "Who averaged 50.4 points in the 1961-62 NBA season?",
    clues: [
      "In basketball, I set the record for scoring in the 1961-62 season",
      "I played for the Philadelphia Warriors",
      "I scored 100 points in a single game this season",
      "I averaged 50.4 points per game in 1961-62",
      "🏀 I also grabbed 25.7 rebounds per game in 1961-62"
    ]
  }
];

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    // Initialize worker state
    initializeWorkerState(env);

    // Get game index from URL
    const requestUrl = new URL(request.url);
    const gameId = requestUrl.searchParams.get('gameId');
    console.log('Received gameId:', gameId);
    
    // If no gameId or invalid, use a random game
    let currentGame;
    if (!gameId) {
      currentGame = sportsRecords[Math.floor(Math.random() * sportsRecords.length)];
    } else {
      // Get the game from stored state
      const currentGameState = env.CURRENT_GAME ? JSON.parse(env.CURRENT_GAME) : {};
      currentGame = currentGameState[gameId];
      
      // Fallback to sportsRecords if game not found in state
      if (!currentGame) {
        const random = parseInt(gameId.split('-')[1]);
        const index = random % sportsRecords.length;
        currentGame = sportsRecords[index];
      }
    }
    console.log('Selected game:', currentGame?.answer);

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    // Log the request details
    console.log('Request:', {
      method: request.method,
      path: requestUrl.pathname,
      gameId,
      currentGame: currentGame?.answer
    });

    const path = requestUrl.pathname.slice(1); // Remove leading slash

    try {
      switch (path) {
        case 'clue': {
          const attempt = parseInt(requestUrl.searchParams.get('attempt'));
          if (attempt >= 0 && attempt < currentGame.clues.length) {
            const response = {
              clue: currentGame.clues[attempt],
              question: currentGame.question
            };
            
            // Add answer on the last attempt
            if (attempt === currentGame.clues.length - 1) {
              response.answer = currentGame.answer;
            }
            
            return new Response(
              JSON.stringify(response),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
          return new Response(
            JSON.stringify({ error: 'Invalid attempt number' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        case 'guess': {
          const { guess } = await request.json();
          console.log('Received guess:', guess);
          
          // Verify we have a valid game state
          if (!currentGame || !currentGame.answer) {
            console.error('No valid game state found for gameId:', gameId);
            return new Response(
              JSON.stringify({ error: 'Invalid game state' }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          // Clean up and normalize the guess
          const cleanGuess = guess.trim();
          console.log('Clean guess:', cleanGuess);
          
          // Normalize both the guess and the current answer
          const normalizedGuess = findExactPlayer(cleanGuess);
          const normalizedAnswer = findExactPlayer(currentGame.answer);
          
          console.log('Normalized values:', {
            originalGuess: cleanGuess,
            normalizedGuess,
            originalAnswer: currentGame.answer,
            normalizedAnswer,
            guessType: typeof normalizedGuess,
            answerType: typeof normalizedAnswer
          });
          
          // Compare the normalized versions
          const guessIsCorrect = normalizedGuess && normalizedAnswer && 
            normalizedGuess.toLowerCase() === normalizedAnswer.toLowerCase();
          
          console.log('Comparison result:', {
            normalizedGuess,
            normalizedAnswer,
            currentGameAnswer: currentGame.answer,
            areEqual: guessIsCorrect
          });

          return new Response(
            JSON.stringify({ correct: guessIsCorrect }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        case 'new-game': {
          // Generate a random game ID using timestamp and random index
          const timestamp = Date.now();
          const randomIndex = Math.floor(Math.random() * sportsRecords.length);
          const newGameId = `${timestamp}-${randomIndex}`;
          console.log('Generated new gameId:', newGameId);
          
          // Initialize game state
          const currentGameState = env.CURRENT_GAME ? JSON.parse(env.CURRENT_GAME) : {};
          
          // Get the record
          const record = sportsRecords[randomIndex];
          console.log('Selected record:', record);
          
          // Normalize the answer using findExactPlayer
          const normalizedAnswer = findExactPlayer(record.answer);
          console.log('Normalized answer:', normalizedAnswer);
          
          // Store the game state with the normalized answer
          currentGameState[newGameId] = {
            ...record,
            answer: normalizedAnswer
          };
          
          env.CURRENT_GAME = JSON.stringify(currentGameState);
          console.log('New game state:', currentGameState[newGameId]);
          
          return new Response(
            JSON.stringify({ success: true, gameId: newGameId }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        case 'players/search': {
          try {
            const query = requestUrl.searchParams.get('q');
            if (!query) {
              return new Response(
                JSON.stringify({ matches: [] }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
              );
            }
            const queryLower = query.toLowerCase();
            const matches = players
            .filter(player => player.toLowerCase().includes(queryLower))
            .sort((a, b) => {
              const aStartsWith = a.toLowerCase().startsWith(queryLower);
              const bStartsWith = b.toLowerCase().startsWith(queryLower);
              if (aStartsWith && !bStartsWith) return -1;
              if (!aStartsWith && bStartsWith) return 1;
              return a.localeCompare(b);
            })
            .slice(0, 10);
          return new Response(
            JSON.stringify({ matches }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
          } catch (error) {
            console.error('Search error:', error);
            return new Response(
              JSON.stringify({ matches: [], error: 'Search failed' }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }

        default:
          return new Response(
            JSON.stringify({ error: 'Not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
};
