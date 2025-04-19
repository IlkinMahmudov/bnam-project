function adjustHeight() {
    const textarea = document.getElementById("userInput");
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  
  async function askGroq() {
    const apiKey = "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";
    const userInput = document.getElementById("userInput").value;
    const resultDiv = document.getElementById("result");
  
    if (!userInput) {
      resultDiv.innerText = "Please enter a question.";
      return;
    }
  
    resultDiv.innerText = "Loading...";
    resultDiv.classList.add('loading');
  
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: `
  You are 'OrganVision', a smart multilingual medical assistant.
  
  ✔️ You only answer questions related to medical topics, human anatomy, health, and the human body.
  
  🌍 You ONLY understand and respond in **English**, **Russian**, or **French**. If the input is in other languages (like Azerbaijani or Turkish), respond: "Sorry, I can only assist in English, Russian, or French."
  
  ❌ You do NOT answer off-topic questions like weather, football, politics, or jokes. Politely say: "I'm a medical assistant and I only respond to medical-related questions."
  
  Be friendly, professional, and concise.
  `
            },
            {
              role: "user",
              content: userInput
            }
          ]
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        let responseMessage = data.choices[0].message.content;
  
        // Riyaziyyat, kod, və digər mövzulara cavab
        if (/code|programming|mathematics|calculator|math|riya/i.test(userInput)) {
          responseMessage = "Sorry, I can only assist in medical-related questions. I'm a medical assistant.";
        } 
        // Digər mövzulara cavab
        else if (/weather|sports|politics|jokes|music|movies|history/i.test(userInput)) {
          responseMessage = "Sorry, I can only assist in medical-related questions. I'm a medical assistant.";
        }
  
        resultDiv.innerText = responseMessage;
        resultDiv.classList.remove('loading');
  
        resultDiv.style.height = 'auto';
        setTimeout(() => {
          resultDiv.style.height = resultDiv.scrollHeight + 'px';
        }, 50);
      } else {
        const error = await response.text();
        resultDiv.innerText = `Error: ${response.status}\n${error}`;
        resultDiv.classList.remove('loading');
      }
  
    } catch (err) {
      resultDiv.innerText = "Network error: " + err.message;
      resultDiv.classList.remove('loading');
    }
  }
  

  
  let orqanlar = {};
  
  fetch('object.json')
    .then(res => res.json())
    .then(data => {
      orqanlar = data.orqanlar; // 🟢 BURADA əsas düzəliş edildi
      console.log("Orqan məlumatları yükləndi:", orqanlar);
    })
    .catch(err => {
      console.error("JSON yüklənmədi:", err);
    });
  
  // Funksiya yalnız orqanlar yükləndikdən sonra çağırılsın
  function showOrgan(name) {
    if (Object.keys(orqanlar).length === 0) {
      console.error("Orqan məlumatları hələ yüklənmədi.");
      return;
    }
  
    const organ = orqanlar[name];
    if (!organ) {
      console.error("Bu adda orqan tapılmadı.");
      return;
    }
  
    document.getElementById("organDetails").classList.remove("hidden");
    document.getElementById("organLargeImg").src = organ.sekil;
    document.getElementById("organName").textContent = name;
    document.getElementById("howItWorks").textContent = organ.neceIsleyir;
    document.getElementById("whatItHelps").textContent = organ.neyeKomekEdIr;
  
    const factsList = document.getElementById("factsList");
    factsList.innerHTML = "";
    organ.faktlar.forEach(fact => {
      const li = document.createElement("li");
      li.textContent = fact;
      factsList.appendChild(li);
    });
  }
  


  // Responsive menyu aç/qapat
  const menuToggle = document.getElementById('menu-toggle');
  const slantedSidebar = document.getElementById('slanted-sidebar');
  const closeIcon = document.getElementById('close-icon');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  
  menuToggle.addEventListener('click', () => {
    slantedSidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
  });
  
  closeIcon.addEventListener('click', () => {
    slantedSidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
  });
  
  sidebarOverlay.addEventListener('click', () => {
    slantedSidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
  });