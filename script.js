let cart = [];

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const name = e.target.dataset.name;
                const price = parseInt(e.target.dataset.price);
                addToCart(name, price);
            });
        });

        function addToCart(name, price) {
            const existingItemIndex = cart.findIndex(item => item.name === name);
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCartDisplay();
        }

        function removeFromCart(itemName) {
            const itemIndex = cart.findIndex(item => item.name === itemName);
            if (itemIndex > -1) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    cart.splice(itemIndex, 1);
                }
            }
            updateCartDisplay();
        }

        function updateCartDisplay() {
            const cartList = document.getElementById('cart-items');
            cartList.innerHTML = "";
            let total = 0;

            cart.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>${(item.price * item.quantity).toLocaleString()} Ft
                        <button class="remove-item-btn" onclick="removeFromCart('${item.name}')">X</button>
                    </span>
                `;
                cartList.appendChild(li);
                total += item.price * item.quantity;
            });

            document.getElementById('total-price').textContent = total.toLocaleString();
        }

        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');

        function appendMessage(sender, text) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('chat-message', sender);
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function sendMessage() {
            const userMessage = chatInput.value.trim();
            if (userMessage === "") return;

            appendMessage('user', userMessage);
            chatInput.value = "";

            setTimeout(() => {
                const botResponse = getBotResponse(userMessage.toLowerCase());
                appendMessage('bot', botResponse);
            }, 700);
        }

        function handleChatKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function getBotResponse(message) {
            if (message.includes("szia") || message.includes("hello")) {
                return "Szia! Miben segíthetek a Kávé Világban?";
            } else if (message.includes("szállítás")) {
                return "A szállítás belföldön ingyenes minden 10.000 Ft feletti rendelés esetén, és 2-3 munkanapon belül teljesítjük.";
            } else if (message.includes("akció") || message.includes("kedvezmény")) {
                return "Jelenleg nincsenek különleges akciók, de érdemes feliratkozni hírlevelünkre a legfrissebb ajánlatokért!";
            } else if (message.includes("kávé") || message.includes("termék")) {
                return "Kínálatunkban Etióp, Kolumbiai, Brazil és Vietnami kávékat találsz. Melyik érdekelne jobban?";
            } else if (message.includes("etióp")) {
                return "Az Etióp Yirgacheffe kávénk élénk citrusos jegyekkel és virágos aromával rendelkezik. Ideális filterkávékhoz.";
            } else if (message.includes("kolumbia")) {
                return "A Kolumbia Supremo egy kiegyensúlyozott, közepes testű kávé, enyhe karamellás és diós ízekkel.";
            } else if (message.includes("brazil")) {
                return "A Brazília Santos kávénk testes és alacsony savtartalmú, csokoládés utóízzel. Kiváló eszpresszó alapanyag.";
            } else if (message.includes("vietnam")) {
                return "A Vietnam Robusta kávéunk erős, intenzív ízű és magas koffeintartalmú. Tökéletes energialökethez!";
            } else if (message.includes("fizetés")) {
                return "Bankkártyás fizetés (Visa, Mastercard) és utánvétel is lehetséges.";
            } else if (message.includes("kapcsolat") || message.includes("elérhetőség")) {
                return "Elérhetsz minket a kapcsolat@kavevilag.hu email címen, vagy telefonon: +36 70 123 4567.";
            } else if (message.includes("köszönöm") || message.includes("köszi")) {
                return "Szívesen! Örülök, hogy segíthettem. Jó kávézást kívánok!";
            }
            return "Sajnálom, nem teljesen értem a kérdést. Kérlek, próbáld megfogalmazni másképp, vagy keress minket emailben/telefonon!";
        }

        updateCartDisplay();