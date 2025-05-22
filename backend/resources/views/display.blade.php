<!-- <!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pharmacy Display</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body, html {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      background: black;
      color: white;
      overflow: hidden;
    }

    .slide, .grid-item {
      height: 100vh;
      width: 100vw;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .overlay {
      background-color: rgba(0,0,0,0.5);
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 20px;
    }

    .overlay h1 {
      font-size: 3rem;
      margin-bottom: 10px;
      text-shadow: 2px 2px 5px #000;
    }

    .overlay p {
      font-size: 1.5rem;
      max-width: 700px;
      text-shadow: 1px 1px 3px #000;
    }

    .overlay .price {
      font-size: 2rem;
      color: #00ccff;
      margin-top: 10px;
    }

    .clock, .date {
      position: absolute;
      font-size: 1rem;
    }

    .clock {
      top: 10px;
      right: 20px;
    }

    .date {
      bottom: 10px;
      left: 20px;
    }

    #toggleView {
      position: absolute;
      top: 10px;
      left: 20px;
      padding: 8px 12px;
      background: #00ccff;
      border: none;
      color: black;
      font-weight: bold;
      cursor: pointer;
    }

    #dots {
      position: absolute;
      bottom: 30px;
      width: 100%;
      text-align: center;
    }

    .dot {
      height: 12px;
      width: 12px;
      margin: 0 5px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;
    }

    .dot.active {
      background-color: #00ccff;
    }

    #grid {
      display: none;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .grid-item {
      width: 300px;
      height: 400px;
      margin: 10px;
    }

  </style>
</head>
<body>

  <button id="toggleView">Mode Grille</button>

  <div id="slideshow">
    @foreach ($products as $index => $product)
      <div class="slide" style="background-image: url('{{ asset('storage/' . $product->image) }}'); display: {{ $index === 0 ? 'block' : 'none' }};">
        <div class="overlay">
          <h1>{{ $product->name }}</h1>
          <p>{{ $product->description }}</p>
          <div class="price">{{ $product->price }} DH</div>
        </div>
      </div>
    @endforeach
    <div id="dots">
      @foreach ($products as $index => $product)
        <span class="dot {{ $index === 0 ? 'active' : '' }}"></span>
      @endforeach
    </div>
    <div class="clock" id="clock"></div>
    <div class="date" id="date"></div>
  </div>

  <div id="grid" style="display: none;">
    @foreach ($products as $product)
      <div class="grid-item" style="background-image: url('{{ asset('storage/' . $product->image) }}');">
        <div class="overlay">
          <h2>{{ $product->name }}</h2>
          <p>{{ $product->description }}</p>
          <div class="price">{{ $product->price }} DH</div>
        </div>
      </div>
    @endforeach
  </div>

  <script>
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const toggleBtn = document.getElementById('toggleView');
    const slideshow = document.getElementById('slideshow');
    const grid = document.getElementById('grid');
    let mode = 'slideshow';

    function showSlide(i) {
      slides.forEach((slide, idx) => slide.style.display = idx === i ? 'block' : 'none');
      dots.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
    }

    setInterval(() => {
      if (mode === 'slideshow') {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }
    }, 15000);

    toggleBtn.addEventListener('click', () => {
      if (mode === 'slideshow') {
        slideshow.style.display = 'none';
        grid.style.display = 'flex';
        toggleBtn.innerText = 'Mode Diaporama';
        mode = 'grid';
      } else {
        slideshow.style.display = 'block';
        grid.style.display = 'none';
        toggleBtn.innerText = 'Mode Grille';
        mode = 'slideshow';
      }
    });

    function updateClock() {
      const now = new Date();
      document.getElementById('clock').textContent = now.toLocaleTimeString();
      document.getElementById('date').textContent =
        now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        + ' / ' +
        now.toLocaleDateString('ar-MA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }

    setInterval(updateClock, 1000);
    updateClock();
  </script>
</body>
</html> -->

<!-- <!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Affichage Pharmacie</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
  <style>
    * {
      box-sizing: border-box;
    }

    body, html {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      background-color: #000;
      color: #fff;
      overflow: hidden;
    }

    .slide, .grid-item {
      height: 100vh;
      width: 100vw;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .overlay {
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 20px;
    }

    .overlay h1, .overlay h2 {
      font-size: 2.8rem;
      margin-bottom: 10px;
      text-shadow: 2px 2px 5px #000;
    }

    .overlay p {
      font-size: 1.2rem;
      max-width: 700px;
      margin: 10px 0;
      text-shadow: 1px 1px 3px #000;
    }

    .overlay .price {
      font-size: 2rem;
      color: #00e1ff;
      font-weight: bold;
      margin-top: 10px;
    }

    .clock, .date {
      position: absolute;
      font-size: 1rem;
    }

    .clock {
      top: 10px;
      right: 20px;
    }

    .date {
      bottom: 10px;
      left: 20px;
    }

    #toggleView {
      position: absolute;
      top: 10px;
      left: 20px;
      padding: 8px 12px;
      background: #00ccff;
      border: none;
      color: black;
      font-weight: bold;
      border-radius: 5px;
      cursor: pointer;
      z-index: 10;
    }

    #dots {
      position: absolute;
      bottom: 30px;
      width: 100%;
      text-align: center;
    }

    .dot {
      height: 12px;
      width: 12px;
      margin: 0 5px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;
      transition: background-color 0.3s;
    }

    .dot.active {
      background-color: #00ccff;
    }

    #grid {
      display: none;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: center;
      align-items: center;
      padding: 40px;
    }

    .grid-item {
      width: 300px;
      height: 400px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.7);
      position: relative;
      background-size: cover;
      background-position: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .grid-item:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.9);
    }
  </style>
</head>
<body>

  <button id="toggleView">Mode Grille</button>

  <div id="slideshow">
    @foreach ($products as $index => $product)
      <div class="slide" style="background-image: url('{{ asset('storage/' . $product->image) }}'); display: {{ $index === 0 ? 'block' : 'none' }};">
        <div class="overlay">
          <h1>{{ $product->name }}</h1>
          <p>{{ $product->description }}</p>
          <div class="price">{{ $product->price }} DH</div>
        </div>
      </div>
    @endforeach

    <div id="dots">
      @foreach ($products as $index => $product)
        <span class="dot {{ $index === 0 ? 'active' : '' }}"></span>
      @endforeach
    </div>

    <div class="clock" id="clock"></div>
    <div class="date" id="date"></div>
  </div>

  <div id="grid">
    @foreach ($products as $product)
      <div class="grid-item" style="background-image: url('{{ asset('storage/' . $product->image) }}');">
        <div class="overlay">
          <h2>{{ $product->name }}</h2>
          <p>{{ $product->description }}</p>
          <div class="price">{{ $product->price }} DH</div>
        </div>
      </div>
    @endforeach
  </div>

  <script>
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const toggleBtn = document.getElementById('toggleView');
    const slideshow = document.getElementById('slideshow');
    const grid = document.getElementById('grid');
    let mode = 'slideshow';

    function showSlide(i) {
      slides.forEach((slide, idx) => slide.style.display = idx === i ? 'block' : 'none');
      dots.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
    }

    setInterval(() => {
      if (mode === 'slideshow') {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }
    }, 15000);

    toggleBtn.addEventListener('click', () => {
      if (mode === 'slideshow') {
        slideshow.style.display = 'none';
        grid.style.display = 'flex';
        toggleBtn.innerText = 'Mode Diaporama';
        mode = 'grid';
      } else {
        slideshow.style.display = 'block';
        grid.style.display = 'none';
        toggleBtn.innerText = 'Mode Grille';
        mode = 'slideshow';
      }
    });

    function updateClock() {
      const now = new Date();
      document.getElementById('clock').textContent = now.toLocaleTimeString();
      document.getElementById('date').textContent =
        now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) +
        ' / ' +
        now.toLocaleDateString('ar-MA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }

    setInterval(updateClock, 1000);
    updateClock();
  </script>
</body>
</html> -->

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pharmacy Display</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/feather-icons"></script>
</head>
<body class="bg-black text-white font-sans">

  <button id="toggleView" class="fixed top-4 left-4 bg-cyan-500 text-black px-4 py-2 rounded shadow font-bold z-50">
    Mode Grille
  </button>

  <div id="slideshow">
    @foreach ($products as $index => $product)
      <div class="slide h-screen w-screen bg-cover bg-center relative" style="background-image: url('{{ asset('storage/' . $product->image) }}'); display: {{ $index === 0 ? 'block' : 'none' }};">
        <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-8">
          <h1 class="text-5xl font-bold mb-4 flex items-center gap-3">
            <i data-feather="tag"></i> {{ $product->name }}
          </h1>
          <p class="text-xl mb-4 max-w-2xl drop-shadow flex items-center gap-2">
            <i data-feather="info"></i> {{ $product->description }}
          </p>
          <div class="text-4xl text-cyan-400 font-semibold flex items-center gap-2">
            <i data-feather="credit-card"></i> {{ $product->price }} DH
          </div>
        </div>
      </div>
    @endforeach

    <div id="dots" class="absolute bottom-8 w-full text-center">
      @foreach ($products as $index => $product)
        <span class="dot inline-block h-3 w-3 mx-1 rounded-full bg-gray-400 {{ $index === 0 ? 'bg-cyan-400' : '' }}"></span>
      @endforeach
    </div>

    <div class="absolute top-2 right-4 text-sm" id="clock"></div>
    <div class="absolute bottom-2 left-4 text-sm" id="date"></div>
  </div>

  <div id="grid" class="hidden flex-wrap justify-center items-center gap-6 p-6">
    @foreach ($products as $product)
      <div class="grid-item w-72 h-96 bg-cover bg-center relative rounded-lg shadow-xl" style="background-image: url('{{ asset('storage/' . $product->image) }}');">
        <div class="absolute inset-0 bg-black bg-opacity-60 p-4 flex flex-col justify-center text-center">
          <h2 class="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <i data-feather="tag"></i> {{ $product->name }}
          </h2>
          <p class="text-sm mb-2 flex items-center justify-center gap-2">
            <i data-feather="info"></i> {{ $product->description }}
          </p>
          <div class="text-xl text-cyan-400 font-semibold flex items-center justify-center gap-2">
            <i data-feather="credit-card"></i> {{ $product->price }} DH
          </div>
        </div>
      </div>
    @endforeach
  </div>

  <script>
    feather.replace();

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const toggleBtn = document.getElementById('toggleView');
    const slideshow = document.getElementById('slideshow');
    const grid = document.getElementById('grid');
    let mode = 'slideshow';

    function showSlide(i) {
      slides.forEach((slide, idx) => slide.style.display = idx === i ? 'block' : 'none');
      dots.forEach((dot, idx) => dot.classList.toggle('bg-cyan-400', idx === i));
    }

    setInterval(() => {
      if (mode === 'slideshow') {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }
    }, 15000);

    toggleBtn.addEventListener('click', () => {
      if (mode === 'slideshow') {
        slideshow.style.display = 'none';
        grid.style.display = 'flex';
        toggleBtn.innerText = 'Mode Diaporama';
        mode = 'grid';
      } else {
        slideshow.style.display = 'block';
        grid.style.display = 'none';
        toggleBtn.innerText = 'Mode Grille';
        mode = 'slideshow';
      }
    });

    function updateClock() {
      const now = new Date();
      document.getElementById('clock').textContent = now.toLocaleTimeString();
      document.getElementById('date').textContent =
        now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        + ' / ' +
        now.toLocaleDateString('ar-MA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }

    setInterval(updateClock, 1000);
    updateClock();
  </script>
</body>
</html>



