const mainPage = document.getElementById('main-page');
const laravel = document.getElementById('laravel');
const rails = document.getElementById('rails');
const express = document.getElementById('express');
const flask = document.getElementById('flask');
const contentSection = document.getElementById('dynamic-content');

function loadFramework(frameworkName) { 
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `subpages/${frameworkName}.html`, true);
    
    xhr.onload = function() {
        if (xhr.status == 200) {
            contentSection.innerHTML = xhr.responseText;
            initCodeTabs();
            contentSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            contentSection.innerHTML = '<div class="error">Błąd ładowania treści</div>';
        }
    };
    
    xhr.onerror = function() {
        contentSection.innerHTML = '<div class="error">Błąd połączenia</div>';
    };
    
    xhr.send();
}

function getFrameworkName() {
    const url = window.location.href;
    const hashIndex = url.indexOf('#');
    const currentFramework = url.substring(hashIndex + 1);
    return currentFramework;
}

function getSourceCodeExamples() {    
    const frameworkName = getFrameworkName();
    const codeBlock = document.querySelectorAll(`.framework-${frameworkName}`);

    for (let i = 1; i < 3; i++) {
        fetch(`codes/${frameworkName}${i}.txt`)
            .then(response => response.text())
            .then(text => {
                codeBlock[i - 1].textContent = text;
            })
            .catch(error => {
                console.error('Błąd wczytywania pliku:', error);
        });
    }
}

// TO BE CHECKED
function initCodeTabs() {
    const tabs = document.querySelectorAll('.code-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.code-content').forEach(c => c.classList.add('hidden'));
            
            this.classList.add('active');
            document.querySelector(`[data-content="${tabName}"]`).classList.remove('hidden');
        });
    });
}

function loadKeyFeaturesFromJSON() {
    const frameworkName = getFrameworkName();
    let i = 0; 

    $(document).ready(function() {
        $.ajax({
            url: `json/${frameworkName}_features.json`,
            dataType: 'json',
            success: function(data) {
                const cards = $('.feature-card');
               
                $.each(data, function(key, value) {
                    const h3 = $('<h3></h3>').text(key); 
                    const p = $('<p></p>').text(value);
                    $(cards[i]).append(h3).append(p);
                    i++;
                });
            },
            error: function(err) {
                console.error('Błąd wczytywania JSON:', err);
            }
        });
    });
}

laravel.addEventListener('click', () => {
    loadFramework('laravel');
    setTimeout(getSourceCodeExamples, 50);
    setTimeout(loadKeyFeaturesFromJSON, 50);
});

rails.addEventListener('click', () => {
    loadFramework('rails');
    setTimeout(getSourceCodeExamples, 50);
    setTimeout(loadKeyFeaturesFromJSON, 50);
});

express.addEventListener('click', () => {
    loadFramework('express');
    setTimeout(getSourceCodeExamples, 50);
    setTimeout(loadKeyFeaturesFromJSON, 50);
});

flask.addEventListener('click', () => {
    loadFramework('flask');
    setTimeout(getSourceCodeExamples, 50);
    setTimeout(loadKeyFeaturesFromJSON, 50);
});

mainPage.addEventListener('click', () => { 
    contentSection.innerHTML = ''; 
});