// Enhanced Presets
        const presets = {
            'لمبة LED': 10, 'مروحة': 80, 'ثلاجة': 180, 'مكيف': 1500,
            'غسالة': 500, 'تلفزيون': 100, 'مضخة': 750, 'حديد كي': 1000
        };

        function setPreset(deviceName, wattage) {
            document.getElementById('deviceName').value = deviceName;
            document.getElementById('watts').value = wattage;
            
            // Visual feedback
            document.querySelectorAll('.preset-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Shake effect
            event.target.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                event.target.style.animation = '';
            }, 500);
        }

        function showLoading() {
            document.getElementById('loadingOverlay').style.display = 'flex';
        }

        function hideLoading() {
            setTimeout(() => {
                document.getElementById('loadingOverlay').style.display = 'none';
            }, 1200);
        }

        function calculate() {
            showLoading();
            
            const deviceName = document.getElementById('deviceName').value || 'الجهاز';
            const watts = parseFloat(document.getElementById('watts').value);
            const hours = parseFloat(document.getElementById('hours').value);
            const pricePerKwh = parseFloat(document.getElementById('pricePerKwh').value);
            const days = parseFloat(document.getElementById('days').value);

            // Validation with enhanced feedback
            if (!watts || watts < 1 || !hours || hours > 24 || !pricePerKwh) {
                hideLoading();
                document.querySelector('.calc-btn').style.animation = 'shake 0.6s cubic-bezier(.36,.07,.19,.97)';
                setTimeout(() => {
                    document.querySelector('.calc-btn').style.animation = '';
                }, 600);
                alert('⚠️ تأكد من إدخال القدرة والساعات بشكل صحيح (1-15000 واط، 0-24 ساعة)');
                return;
            }

            // Professional calculations
            const dailyKwh = (watts * hours) / 1000;
            const monthlyKwh = dailyKwh * days;
            const dailyCost = dailyKwh * pricePerKwh;
            const monthlyCost = monthlyKwh * pricePerKwh;
            const savingsTip = Math.round((monthlyCost * 0.25) * 100) / 100; // 25% savings

            // Arabic number formatting
            const formatNumber = (num) => {
                return num.toLocaleString('ar-EG', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            };

            // Update results with stagger animation
            setTimeout(() => {
                document.getElementById('dailyKwh').textContent = 
                    `${formatNumber(dailyKwh)} كيلوواط/ساعة | ${formatNumber(dailyCost)} جنيه`;
                
                document.getElementById('monthlyKwh').textContent = 
                    `${formatNumber(monthlyKwh)} كيلوواط/شهر | ${formatNumber(monthlyCost)} جنيه`;
                
                document.getElementById('dailyCost').textContent = `${formatNumber(dailyCost)} جنيه`;
                document.getElementById('monthlyCost').textContent = `${formatNumber(monthlyCost)} جنيه`;

                // Show results section
                const resultsSection = document.getElementById('resultsSection');
                resultsSection.style.display = 'block';
                
                // Staggered animation for results
                setTimeout(() => {
                    document.querySelectorAll('.result-item').forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('show');
                        }, index * 150);
                    });
                }, 200);

                // Smooth scroll to results
                resultsSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });

                hideLoading();
            }, 800);
        }

        // Enter key support
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !document.getElementById('loadingOverlay').style.display) {
                calculate();
            }
        });

        // Mobile menu toggle
        function toggleMobileMenu() {
            const nav = document.getElementById('mainNav');
            nav.classList.toggle('active');
        }

        // Create floating particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            document.getElementById('bgAnimation').appendChild(particle);

            setTimeout(() => particle.remove(), 7000);
        }

        // Initialize page
        window.addEventListener('load', function() {
            // Preload example
            document.getElementById('watts').value = 1500;
            document.getElementById('hours').value = 8;
            
            // Start particle system
            setInterval(createParticle, 1500);
            
            // Initial animations
            document.querySelector('.logo').style.opacity = '1';
            document.querySelector('.calc-btn').style.transform = 'scale(1.05)';
        });

        // Add shake animation to CSS dynamically
        const shakeStyle = document.createElement('style');
        shakeStyle.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0) scale(1); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-8px) scale(1.02); }
                20%, 40%, 60%, 80% { transform: translateX(8px) scale(1.02); }
            }
        `;
        document.head.appendChild(shakeStyle);