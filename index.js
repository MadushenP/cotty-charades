const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// --- DATABASE (In-Memory) ---
let wordDatabase = [
/* Level 1: Easy */
{ word: "சிங்கம் (Singam)", type: "Movie", difficulty: "Easy" },
{ word: "கத்தி (Kaththi)", type: "Movie", difficulty: "Easy" },
{ word: "துப்பாக்கி (Thuppakki)", type: "Movie", difficulty: "Easy" },
{ word: "குருவி (Kuruvi)", type: "Movie", difficulty: "Easy" },
{ word: "பிகில் (Bigil)", type: "Movie", difficulty: "Easy" },
{ word: "ஜெயிலர் (Jailer)", type: "Movie", difficulty: "Easy" },
{ word: "பூ (Poo)", type: "Movie", difficulty: "Easy" },
{ word: "நான் ஈ (Naan Ee)", type: "Movie", difficulty: "Easy" },
{ word: "3 (மூன்று) (Moonu)", type: "Movie", difficulty: "Easy" },
{ word: "பாம்பு (Pambu)", type: "Movie", difficulty: "Easy" },
{ word: "ஆணி (Aani)", type: "Movie", difficulty: "Easy" },
{ word: "பிஸ்ஸா (Pizza)", type: "Movie", difficulty: "Easy" },
{ word: "டாக்டர் (Doctor)", type: "Movie", difficulty: "Easy" },
{ word: "அரண்மனை (Aranmanai)", type: "Movie", difficulty: "Easy" },
{ word: "லவ் டுடே (Love Today)", type: "Movie", difficulty: "Easy" },
{ word: "நண்பன் (Nanban)", type: "Movie", difficulty: "Easy" },
{ word: "புலி (Puli)", type: "Movie", difficulty: "Easy" },
{ word: "மழை (Mazhai)", type: "Movie", difficulty: "Easy" },
{ word: "ஆடு (Aadu)", type: "Movie", difficulty: "Easy" },
{ word: "வில்லன் (Villain)", type: "Movie", difficulty: "Easy" },
{ word: "கோழி கூவுது (Kozhi Koovuthu)", type: "Movie", difficulty: "Easy" },
{ word: "வேட்டைக்காரன் (Vettaikaaran)", type: "Movie", difficulty: "Easy" },
{ word: "அலை (Alai)", type: "Movie", difficulty: "Easy" },
{ word: "சக்கரம் (Chakkaram)", type: "Movie", difficulty: "Easy" },
{ word: "அடிமைப்பெண் (Adimai Penn)", type: "Movie", difficulty: "Easy" },
{ word: "கரகாட்டக்காரன் (Karakattakkaran)", type: "Movie", difficulty: "Easy" },
{ word: "மௌன ராகம் (Mouna Ragam)", type: "Movie", difficulty: "Easy" },
{ word: "பருத்திவீரன் (Paruthiveeran)", type: "Movie", difficulty: "Easy" },
{ word: "விருமன் (Viruman)", type: "Movie", difficulty: "Easy" },
{ word: "ரன் (Run)", type: "Movie", difficulty: "Easy" },

/* Level 2: Medium */
{ word: "ராஜா ராணி (Raja Rani)", type: "Movie", difficulty: "Medium" },
{ word: "மின்சார கனவு (Minsara Kanavu)", type: "Movie", difficulty: "Medium" },
{ word: "7ஆம் அறிவு (7aum Arivu)", type: "Movie", difficulty: "Medium" },
{ word: "ஆடுகளம் (Aadukalam)", type: "Movie", difficulty: "Medium" },
{ word: "காக்க காக்க (Kaakha Kaakha)", type: "Movie", difficulty: "Medium" },
{ word: "சுப்ரமணியபுரம் (Subramaniapuram)", type: "Movie", difficulty: "Medium" },
{ word: "தனி ஒருவன் (Thani Oruvan)", type: "Movie", difficulty: "Medium" },
{ word: "சந்திரமுகி (Chandramukhi)", type: "Movie", difficulty: "Medium" },
{ word: "வேட்டையாடு விளையாடு (Vettaiyaadu Vilaiyaadu)", type: "Movie", difficulty: "Medium" },
{ word: "கடல் (Kadal)", type: "Movie", difficulty: "Medium" },
{ word: "கோமாளி (Comali)", type: "Movie", difficulty: "Medium" },
{ word: "அலைபாயுதே (Alaipayuthey)", type: "Movie", difficulty: "Medium" },
{ word: "மங்காத்தா (Mankatha)", type: "Movie", difficulty: "Medium" },
{ word: "வாயை மூடி பேசவும் (Vaayai Moodi Pesavum)", type: "Movie", difficulty: "Medium" },
{ word: "கண்ணும் கண்ணும் கொள்ளையடித்தால் (Kannum Kannum Kollaiyadithaal)", type: "Movie", difficulty: "Medium" },
{ word: "வாகை சூட வா (Vaagai Sooda Vaa)", type: "Movie", difficulty: "Medium" },
{ word: "அண்ணாத்த (Annaatthe)", type: "Movie", difficulty: "Medium" },
{ word: "காதலிச்ச சோடாப்புலி (Kaadhalil Sodhappuvadhu Yeppadi)", type: "Movie", difficulty: "Medium" },
{ word: "இறுதி சுற்று (Irudhi Suttru)", type: "Movie", difficulty: "Medium" },
{ word: "தெய்வத் திருமகள் (Deiva Thirumagal)", type: "Movie", difficulty: "Medium" },
{ word: "கிழக்கு சீமையிலே (Kizhakku Cheemayile)", type: "Movie", difficulty: "Medium" },
{ word: "எங்க வீட்டு பிள்ளை (Enga Veettu Pillai)", type: "Movie", difficulty: "Medium" },
{ word: "படிக்காதவன் (Padikkadhavan)", type: "Movie", difficulty: "Medium" },
{ word: "நீ வருவாய் என (Nee Varuvai Ena)", type: "Movie", difficulty: "Medium" },
{ word: "உள்ளத்தை அள்ளித்தா (Ullathai Allitha)", type: "Movie", difficulty: "Medium" },
{ word: "அவ்வை சண்முகி (Avvai Shanmugi)", type: "Movie", difficulty: "Medium" },
{ word: "தூள் (Dhool)", type: "Movie", difficulty: "Medium" },
{ word: "அயன் (Ayan)", type: "Movie", difficulty: "Medium" },
{ word: "அந்நியன் (Anniyan)", type: "Movie", difficulty: "Medium" },
{ word: "மதராசபட்டினம் (Madrasapattinam)", type: "Movie", difficulty: "Medium" },

/* Level 3: Hard */
{ word: "நடுவுல கொஞ்சம் பக்கத்த காணோம் (Naduvula Konjam Pakkatha Kaanom)", type: "Movie", difficulty: "Hard" },
{ word: "விண்ணைத்தாண்டி வருவாயா (Vinnaithaandi Varuvaayaa)", type: "Movie", difficulty: "Hard" },
{ word: "நீதானே என் பொன்வசந்தம் (Neethaane En Ponvasantham)", type: "Movie", difficulty: "Hard" },
{ word: "ஒரு கிடாயின் கருணை மனு (Oru Kidayin Karunai Manu)", type: "Movie", difficulty: "Hard" },
{ word: "ஜிகர்தண்டா (Jigarthanda)", type: "Movie", difficulty: "Hard" },
{ word: "ஆரண்ய காண்டம் (Aaranya Kaandam)", type: "Movie", difficulty: "Hard" },
{ word: "இன்று நேற்று நாளை (Indru Netru Naalai)", type: "Movie", difficulty: "Hard" },
{ word: "இம்சை அரசன் 23ம் புலிகேசி (Imsai Arasan 23am Pulikesi)", type: "Movie", difficulty: "Hard" },
{ word: "காற்று வெளியிடை (Kaatru Veliyidai)", type: "Movie", difficulty: "Hard" },
{ word: "ஓ மை கடவுளே (Oh My Kadavule)", type: "Movie", difficulty: "Hard" },
{ word: "முண்டாசுப்பட்டி (Mundasupatti)", type: "Movie", difficulty: "Hard" },
{ word: "பரியேறும் பெருமாள் (Pariyerum Perumal)", type: "Movie", difficulty: "Hard" },
{ word: "சூப்பர் டீலக்ஸ் (Super Deluxe)", type: "Movie", difficulty: "Hard" },
{ word: "வேலை இல்லா பட்டதாரி (Velai Illa Pattadhaari)", type: "Movie", difficulty: "Hard" },
{ word: "பண்ணையாரும் பத்மினியும் (Pannaiyarum Padminiyum)", type: "Movie", difficulty: "Hard" },
{ word: "குக்கூ (Cuckoo)", type: "Movie", difficulty: "Hard" },
{ word: "வாரணம் ஆயிரம் (Vaaranam Aayiram)", type: "Movie", difficulty: "Hard" },
{ word: "அழகிய தமிழ் மகன் (Azhagiya Tamil Magan)", type: "Movie", difficulty: "Hard" },
{ word: "தீராத விளையாட்டு பிள்ளை (Theeradha Vilaiyattu Pillai)", type: "Movie", difficulty: "Hard" },
{ word: "என்னை அறிந்தால் (Yennai Arindhaal)", type: "Movie", difficulty: "Hard" },
{ word: "இதற்குதானே ஆசைப்பட்டாய் பாலகுமாரா (Idharkuthane Aasaipattai Balakumara)", type: "Movie", difficulty: "Hard" },
{ word: "கர்ணன் (Karnan)", type: "Movie", difficulty: "Hard" },
{ word: "ஆயிரத்தில் ஒருவன் (Aayirathil Oruvan)", type: "Movie", difficulty: "Hard" },
{ word: "கப்பலோட்டிய தமிழன் (Kappalottiya Thamizhan)", type: "Movie", difficulty: "Hard" },
{ word: "தில்லு முல்லு (Thillu Mullu)", type: "Movie", difficulty: "Hard" },
{ word: "மைக்கேல் மதன காம ராஜன் (Michael Madana Kama Rajan)", type: "Movie", difficulty: "Hard" },
{ word: "சர்வர் சுந்தரம் (Server Sundaram)", type: "Movie", difficulty: "Hard" },
{ word: "காதலிக்க நேரமில்லை (Kadhalikka Neramillai)", type: "Movie", difficulty: "Hard" },
{ word: "என் ஆளோட செருப்பக் காணோம் (En Aaloda Seruppa Kaanom)", type: "Movie", difficulty: "Hard" },
{ word: "முந்தானை முடிச்சு (Mundhanai Mudichu)", type: "Movie", difficulty: "Hard" },
];

// Room State Storage
const rooms = {};

// --- ADMIN ROUTES ---
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "charades123") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/admin/add-words", (req, res) => {
  const { type, difficulty, wordsRaw } = req.body;
  if(!wordsRaw) return res.json({ success: false });
  
  const newWords = wordsRaw.split(",").map(w => w.trim()).filter(w => w.length > 0);
  
  newWords.forEach(w => {
    wordDatabase.push({ word: w, type, difficulty });
  });
  
  console.log(`Added ${newWords.length} new words.`);
  res.json({ success: true, count: newWords.length });
});

// --- SOCKET GAME LOGIC ---
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 1. Create Room (Game Lead)
  socket.on("create_room", (data) => {
    const roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    rooms[roomCode] = {
      config: data, // { roomName, gameType, teamCount, teamNames, duration }
      players: [],
      scores: {}, // { "Team A": 0, "Team B": 0 }
      usedWords: [], // <--- TRACK USED WORDS HERE
      currentTurn: null, // { player, team, word, startTime, difficulty }
      timer: null
    };

    // Initialize scores for teams
    data.teamNames.forEach(name => {
      rooms[roomCode].scores[name] = 0;
    });

    socket.emit("room_created", { roomCode, teamNames: data.teamNames });
  });

  // 2. Join Room (Player)
  socket.on("join_room", ({ roomCode, playerName, teamName }) => {
    const room = rooms[roomCode];
    if (!room) {
      socket.emit("error_msg", "Room not found!");
      return;
    }

    socket.join(roomCode);
    
    // Check if player exists first to avoid duplicates
    const existingPlayerIndex = room.players.findIndex(p => p.id === socket.id);
    
    if (existingPlayerIndex !== -1) {
        room.players[existingPlayerIndex].name = playerName;
        room.players[existingPlayerIndex].team = teamName;
    } else {
        const player = { id: socket.id, name: playerName, team: teamName };
        room.players.push(player);
    }

    io.to(roomCode).emit("update_lobby", {
      players: room.players,
      config: room.config,
      scores: room.scores
    });

    if (room.currentTurn && room.currentTurn.active) {
       socket.emit("game_in_progress", room.currentTurn);
    }
  });

  // 3. Player requests to take a turn
  socket.on("setup_turn", ({ roomCode }) => {
    socket.emit("show_turn_options");
  });

  // 4. Player confirms options -> Get Word
  socket.on("get_word", ({ roomCode, type, difficulty }) => {
    const room = rooms[roomCode];
    if(!room) return;

    // Filter words: Match criteria AND ensure NOT in usedWords
    const eligibleWords = wordDatabase.filter(w => 
      (type === "Both" || w.type === type) && 
      w.difficulty === difficulty &&
      !room.usedWords.includes(w.word) // <--- FILTER DUPLICATES
    );

    if (eligibleWords.length === 0) {
      socket.emit("error_msg", "All words in this category have been played! Add more in Admin.");
      return;
    }

    const randomWord = eligibleWords[Math.floor(Math.random() * eligibleWords.length)];

    // Mark word as used immediately
    room.usedWords.push(randomWord.word); // <--- MARK AS USED

    // Set Turn State
    room.currentTurn = {
      player: socket.id,
      wordObj: randomWord,
      type: type,
      difficulty: difficulty,
      active: false
    };

    socket.broadcast.to(roomCode).emit("gamer_getting_ready");
    socket.emit("receive_word", randomWord);
  });

  // 5. Start Acting (Timer Start)
  socket.on("start_acting", ({ roomCode }) => {
    const room = rooms[roomCode];
    if(!room || !room.currentTurn) return;

    room.currentTurn.active = true;
    room.currentTurn.startTime = Date.now();
    let duration = parseInt(room.config.duration);

    io.to(roomCode).emit("game_started", { duration });

    if (room.timer) clearInterval(room.timer);

    room.timer = setInterval(() => {
      duration--;
      if (duration <= 0) {
        clearInterval(room.timer);
        io.to(roomCode).emit("turn_ended", { success: false });
        io.to(roomCode).emit("update_scores", room.scores); 
      }
    }, 1000);
  });

  // 6. Word Found (Calculate Score)
  socket.on("word_found", ({ roomCode }) => {
    const room = rooms[roomCode];
    if(!room || !room.currentTurn) return;

    clearInterval(room.timer);

    const totalTime = parseInt(room.config.duration);
    const timeTaken = (Date.now() - room.currentTurn.startTime) / 1000;
    const timeRemaining = Math.max(0, totalTime - timeTaken);
    
    let maxPoints = 60;
    if (room.currentTurn.difficulty === "Medium") maxPoints = 80;
    if (room.currentTurn.difficulty === "Hard") maxPoints = 100;

    const score = Math.round(maxPoints * (0.5 + (0.5 * (timeRemaining / totalTime))));

    const player = room.players.find(p => p.id === socket.id);
    if (player && room.scores[player.team] !== undefined) {
      room.scores[player.team] += score;
    }

    io.to(roomCode).emit("turn_ended", { 
      success: true, 
      score, 
      word: room.currentTurn.wordObj.word,
      team: player ? player.team : "Unknown"
    });
    
    io.to(roomCode).emit("update_scores", room.scores);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
