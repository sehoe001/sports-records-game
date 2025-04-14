export const onRequest = async (context) => {
  const url = new URL(context.request.url);
  const path = url.pathname.replace('/api/', '');

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // Game data
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
    // ... (copy all other records from server.js)
  ];

  // Players data (copy the entire players array from server.js)
  const players = [
    // ... (copy all players from server.js)
  ];

  // Game state (using KV store in production)
  let currentGame = sportsRecords[Math.floor(Math.random() * sportsRecords.length)];

  try {
    switch (path) {
      case 'clue': {
        const attempt = parseInt(url.searchParams.get('attempt'));
        if (attempt >= 0 && attempt < currentGame.clues.length) {
          return new Response(
            JSON.stringify({
              clue: currentGame.clues[attempt],
              question: currentGame.question
            }),
            { headers }
          );
        }
        return new Response(
          JSON.stringify({ error: 'Invalid attempt number' }),
          { status: 400, headers }
        );
      }

      case 'guess': {
        const { guess } = await context.request.json();
        const correct = guess.toLowerCase() === currentGame.answer.toLowerCase();
        return new Response(
          JSON.stringify({ correct }),
          { headers }
        );
      }

      case 'new-game': {
        currentGame = sportsRecords[Math.floor(Math.random() * sportsRecords.length)];
        return new Response(
          JSON.stringify({ success: true }),
          { headers }
        );
      }

      case 'players/search': {
        const query = url.searchParams.get('q').toLowerCase();
        const matches = players
          .filter(player => player.toLowerCase().includes(query))
          .sort((a, b) => {
            const aStartsWith = a.toLowerCase().startsWith(query);
            const bStartsWith = b.toLowerCase().startsWith(query);
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            return a.localeCompare(b);
          })
          .slice(0, 10);
        return new Response(
          JSON.stringify({ matches }),
          { headers }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Not found' }),
          { status: 404, headers }
        );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers }
    );
  }
};
