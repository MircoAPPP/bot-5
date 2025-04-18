const { Client, GatewayIntentBits, Partials, EmbedBuilder, PermissionsBitField, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('./config.json'); // Importa il file di configurazione
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const warnDataPath = './warns.json';
const path = require('path'); // Aggiungi questa riga
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User]
});

const PREFIX = config.prefix; // Prefisso per i comandi
client.prefix = PREFIX;
const GIPHY_API_KEY = process.env.GIPHY_API_KEY; // Usa la chiave API da .env
const WELCOME_CHANNEL_ID = "1331000466900779111"
const WELCOME_ROLE_ID = "1331005128450375691"
const TICKETS_DIR = path.join(__dirname, 'tickets');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;

client.once('ready', () => {
    console.log(`Bot avviato come ${client.user.tag}`);
});

// Funzione per ottenere una GIF da Giphy
async function getAnimeGif(action) {
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=anime ${action}&limit=10`;
        const response = await axios.get(url);
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.data.length);
        return data.data[randomIndex].images.original.url;
    } catch (error) {
        console.error('Errore durante il recupero della GIF:', error);
        return null;
    }
}

async function getKirbyGif(action) {
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=kirby ${action}&limit=10`;
        const response = await axios.get(url);
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.data.length);
        return data.data[randomIndex].images.original.url;
    } catch (error) {
        console.error('Errore durante il recupero della GIF:', error);
        return null;
    }
}



async function getFurryGif(action) {
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=furry-fandom ${action}&limit=10`;
        const response = await axios.get(url);
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.data.length);
        return data.data[randomIndex].images.original.url;
    } catch (error) {
        console.error('Errore durante il recupero della GIF:', error);
        return null;
    }
}

async function getKillGif(action) {
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=kill ${action}&limit=10`;
        const response = await axios.get(url);
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.data.length);
        return data.data[randomIndex].images.original.url;
    } catch (error) {
        console.error('Errore durante il recupero della GIF:', error);
        return null;
    }
}



// Comandi di roleplay
const roleplayCommands = {
    darling: {
        description: 'Chiama qualcuno "Darling"',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two darling');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} chiama ${message.mentions.users.first()?.username || 'qualcuno'} "Darling"`)
                .setDescription(roleplayCommands.darling.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },

    kill: {
        description: 'Ammazza qualcuno',
        execute: async (message, args) => {
            const gifUrl = await getKillGif('kill');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} ammazza ${message.mentions.users.first()?.username}`)
                .setDescription(roleplayCommands.kill.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    pilot: {
        description: 'Diventa il pilota di un Franxx',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two pilot');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} diventa il pilota di un Franxx`)
                .setDescription(roleplayCommands.pilot.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    smile: {
        description: 'Mostra un sorriso malizioso',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two smile');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} sorride maliziosamente`)
                .setDescription(roleplayCommands.smile.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    fight: {
        description: 'Preparati per una battaglia epica',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two fight');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} Kirby :)`)
                .setDescription(roleplayCommands.fight.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    kirby: {
        description: "Kirby",
        execute: async (message, args) => {
            const gifUrl = await getKirbyGif("kirby");
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`Kirbo`)
                .setDescription("kirbo ;)")
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    furry: {
        description: "Get furry gif",
        execute: async (message, args) => {
            const gifUrl = await getFurryGif("furry");
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`Kirbo`)
                .setDescription("Get furry gif")
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    transform: {
        description: 'Trasformati in una forma potente',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two transform');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} si trasforma in una forma potente`)
                .setDescription(roleplayCommands.transform.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    dance: {
        description: 'Balliamo insieme!',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two dance');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} balla con ${message.mentions.users.first()?.username || 'qualcuno'}`)
                .setDescription(roleplayCommands.dance.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    hug: {
        description: 'Abbraccia qualcuno',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('hug');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} abbraccia ${message.mentions.users.first()?.username || 'qualcuno'}`)
                .setDescription(roleplayCommands.hug.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    kiss: {
        description: 'Bacia qualcuno',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('kiss');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} bacia ${message.mentions.users.first()?.username || 'qualcuno'}`)
                .setDescription(roleplayCommands.kiss.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    pat: {
        description: 'Fai una carezza a qualcuno',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('pat');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} fa una carezza a ${message.mentions.users.first()?.username || 'qualcuno'}`)
                .setDescription(roleplayCommands.pat.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    slap: {
        description: 'Dai uno schiaffo a qualcuno',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('slap');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} schiaffeggia ${message.mentions.users.first()?.username || 'qualcuno'}`)
                .setDescription(roleplayCommands.slap.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
};




function verifyToken(userToken, staffToken, ticketId, userId) {
    // Se è lo staff con token permanente
    if (staffToken === STAFF_TOKEN) return true;
    
    // Se è il creatore del ticket con token temporaneo
    const tempToken = tempTokens.get(ticketId);
    if (userId === tempToken?.ownerId && userToken === tempToken?.token && Date.now() < tempToken.expiresAt) {
        return true;
    }
    
    return false;
}

client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'benvenuto');
    if (!welcomeChannel) return;

    const welcomeEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Benvenuto!')
        .setDescription(`Ciao ${member.user.username}, benvenuto su ${member.guild.name}!`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();

    welcomeChannel.send({ embeds: [welcomeEmbed] });
});

const ticketsDir = path.join(__dirname, 'tickets');
if (!fs.existsSync(ticketsDir)) {
    fs.mkdirSync(ticketsDir);
}

function updateIndexHTML() {
    const ticketFiles = fs.readdirSync(ticketsDir)
        .filter(file => file.endsWith('.html') && file !== 'index.html');

    let htmlContent = `<!DOCTYPE html><html><head><title>Ticket Archiviati</title></head><body><h1>Ticket Archiviati</h1><ul>`;
    
    ticketFiles.forEach(file => {
        htmlContent += `<li><a href="${file}">${file.replace('.html', '')}</a></li>`;
    });

    htmlContent += `</ul></body></html>`;
    fs.writeFileSync(path.join(ticketsDir, 'index.html'), htmlContent);
}

function generateHTMLTemplate(ticketInfo, messages) {
    return `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transcript Ticket #${ticketInfo.name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Whitney:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
:root {
            --bg-primary: #36393f;
            --bg-secondary: #2f3136;
            --text-normal: #dcddde;
            --text-muted: #72767d;
            --brand: #5865f2;
        }
        body {
            background-color: var(--bg-primary);
            color: var(--text-normal);
            font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 20px;
            line-height: 1.5;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: var(--bg-secondary);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            border-bottom: 1px solid var(--text-muted);
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .message {
            display: flex;
            margin-bottom: 15px;
            padding: 5px 10px;
            border-radius: 4px;
            transition: background 0.2s;
        }
        .message:hover {
            background: rgba(79, 84, 92, 0.4);
        }
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 15px;
            object-fit: cover;
        }
        .message-content {
            flex: 1;
        }
        .message-header {
            display: flex;
            align-items: baseline;
            margin-bottom: 5px;
        }
        .username {
            font-weight: 600;
            color: white;
            margin-right: 8px;
        }
        .timestamp {
            font-size: 0.75em;
            color: var(--text-muted);
        }
        .message-text {
            word-break: break-word;
        }
        .attachments {
            margin-top: 10px;
        }
        .attachment {
            max-width: 300px;
            border-radius: 4px;
            margin-top: 5px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.8em;
            color: var(--text-muted);
                text-align: center;
            }
        </style>
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const params = new URLSearchParams(window.location.search);
            const ticketId = '${ticketInfo.id}';
            const userToken = params.get('token');
            const staffToken = params.get('staffToken');

            if (!userToken && !staffToken) {
                document.body.innerHTML = '<div class="container"><h1>Accesso negato</h1><p>Token mancante</p></div>';
                return;
            }

            fetch('/.netlify/functions/verify-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userToken,
                    staffToken,
                    ticketId,
                    userId: '${ticketInfo.openerId}'
                })
            })
            .then(response => {
                if (!response.ok) {
                    document.body.innerHTML = '<div class="container"><h1>Accesso negato</h1><p>Token non valido o scaduto</p></div>';
                }
            })
            .catch(() => {
                document.body.innerHTML = '<div class="container"><h1>Errore</h1><p>Impossibile verificare il token</p></div>';
            });
        });
    </script>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Transcript Ticket #${ticketInfo.name}</h1>
            <p><strong>Creato da:</strong> ${ticketInfo.opener}</p>
            <p><strong>Aperto il:</strong> ${ticketInfo.createdAt.toLocaleString()}</p>
            <p><strong>Chiuso il:</strong> ${ticketInfo.closedAt.toLocaleString()}</p>
        </div>

        <div class="messages">
            ${messages.reverse().map(msg => `
            <div class="message">
                <img class="avatar" src="${msg.author.displayAvatarURL({ extension: 'png', size: 128 })}" alt="${msg.author.username}">
                <div class="message-content">
                    <div class="message-header">
                        <span class="username">${msg.author.username}</span>
                        <span class="timestamp">${msg.createdAt.toLocaleString()}</span>
                    </div>
                    <div class="message-text">${msg.content}</div>
                    ${msg.attachments.size > 0 ? `
                    <div class="attachments">
                        ${Array.from(msg.attachments.values()).map(att => 
                            `<img src="${att.url}" class="attachment" alt="Allegato">`
                        ).join('')}
                    </div>` : ''}
                </div>
            </div>
            `).join('')}
        </div>

        <div class="footer">
            <p>Transcript generato automaticamente • ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>
`;
}

// Funzione per aggiornare index.html
async function generateTranscript(channel) {
        try {
            const messages = await channel.messages.fetch({ limit: 100 });
            const token = uuidv4();
        const tokensPath = path.join(ticketsDir, 'tokens.json');
        
        // Gestione token
        let tokens = {};
        if(fs.existsSync(tokensPath)) {
            tokens = JSON.parse(fs.readFileSync(tokensPath));
        }
        tokens[channel.id] = token;
        fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2));

    let htmlContent = `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trascrizione Ticket - ${channel.name}</title>
    <style>
        body {
            background-color: #36393f;
            color: #ffffff;
            font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #ffffff;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 10px 0;
        }
        a {
            text-decoration: none;
            color: #00b0f4;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
    <script>
        (function() {
            const params = new URLSearchParams(window.location.search);
            const ticketId = '${channel.id}';
            
            if(!params.has('token')) {
                window.location.href = '/404';
                return;
            }

            fetch('/.netlify/functions/verify-token?ticket=' + ticketId + '&token=' + params.get('token'))
                .then(response => {
                    if(!response.ok) window.location.href = '/401';
                });
        })();
    </script>

<body>
    <h1>Elenco Ticket</h1>
    <ul>
`;

    ticketFiles.forEach(file => {
        const ticketName = file.replace('.html', '');
        htmlContent += `
        <li><a href="${file}">${ticketName}</a></li>
`;
    });

    htmlContent += `
    </ul>
</body>
</html>
`;

fs.writeFileSync(path.join(ticketsDir, 'index.html'), htmlContent);
} catch (error) {
    console.error('Errore durante la generazione della trascrizione:', error);
    return null;
}
}


// Funzione per generare la trascrizione HTML di un ticket
async function generateTranscript(channel, openerId) {
    try {
        // Genera e salva il token temporaneo
        const tempToken = generateTempToken();
        tempTokens.set(channel.id, {
            token: tempToken.token,
            expiresAt: tempToken.expiresAt,
            ownerId: openerId
        });

        // Invia il token all'utente via DM
        try {
            const opener = await client.users.fetch(openerId);
            await opener.send(`🔐 Token per accedere al ticket #${channel.name}: \`${tempToken.token}\`\nScade tra 10 minuti.`);
        } catch (dmError) {
            console.error('Impossibile inviare il token via DM:', dmError);
        }

        // Genera il contenuto HTML
        const ticketInfo = {
            id: channel.id,
            name: channel.name,
            opener: channel.topic || 'N/A',
            openerId: openerId,
            createdAt: channel.createdAt,
            closedAt: new Date()
        };

        const messages = await channel.messages.fetch({ limit: 100 });
        const htmlContent = generateHTMLTemplate(ticketInfo, messages);

        // Salva il file HTML
        const transcriptPath = path.join(ticketsDir, `${channel.name}_${channel.id}.html`);
        fs.writeFileSync(transcriptPath, htmlContent);

        // Aggiorna l'indice dei ticket
        updateIndexHTML();

        return transcriptPath;
    } catch (error) {
        console.error('Errore durante la generazione della trascrizione:', error);
        return null;
    }
}
// Gestione degli eventi dei bottoni
client.on('interactionCreate', async interaction => {
    try {
        if (!interaction.isButton()) return;

        const { customId, guild, member, channel } = interaction;

        if (customId === 'apri_ticket') {
            // Verifica se l'utente ha già un ticket aperto
            const existingTicket = guild.channels.cache.find(ch => ch.name === `ticket-${member.user.id}`);
            if (existingTicket) {
                return interaction.reply({ content: 'Hai già un ticket aperto!', flags: 'Ephemeral' });
            }

            // Creazione del canale ticket
            const ticketChannel = await guild.channels.create({
                name: `ticket-${member.user.id}`, // Nome del canale
                type: ChannelType.GuildText, // Tipo di canale (testo)
                permissionOverwrites: [
                    {
                        id: guild.id, // Imposta i permessi per il server
                        deny: [PermissionsBitField.Flags.ViewChannel], // Nega la vista a tutti
                    },
                    {
                        id: member.user.id, // Imposta i permessi per l'utente
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages], // Permetti la vista e l'invio di messaggi
                    },
                ],
            });

            // Embed per il ticket creato
            const ticketEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Ticket Aperto')
                .setDescription(`Ciao ${member.user.username}, il tuo ticket è stato aperto!`)
                .addFields(
                    { name: 'Utente', value: `${member.user}`, inline: true },
                    { name: 'ID Ticket', value: `${ticketChannel.id}`, inline: true }
                )
                .setFooter({ text: 'Il nostro team ti risponderà al più presto!' })
                .setTimestamp();

            // Pulsanti per il ticket (Claim e Close)
            const ticketButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('claim_ticket')
                        .setLabel('Claim')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('close_ticket')
                        .setLabel('Close')
                        .setStyle(ButtonStyle.Danger)
                );

            // Invio dell'embed e dei pulsanti nel canale del ticket
            ticketChannel.send({ embeds: [ticketEmbed], components: [ticketButtons] });

            // Risposta all'utente
            interaction.reply({ content: `Il tuo ticket è stato creato: ${ticketChannel}`, flags: 'Ephemeral' });
        }

        if (customId === 'claim_ticket') {
            if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                return interaction.reply({ content: 'Non hai il permesso di gestire i ticket.', flags: 'Ephemeral' });
            }

            await channel.permissionOverwrites.edit(member.id, { ViewChannel: true, SendMessages: true });

            // Invia un messaggio pubblico nel canale del ticket
            channel.send(`Il ticket è stato reclamato da ${member.user.username}.`);
        }

        if (customId === 'close_ticket') {
            const openerId = channel.name.replace('ticket-', '');      
            const transcriptPath = await generateTranscript(channel, openerId);
            if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                return interaction.reply({ content: 'Non hai il permesso di chiudere i ticket.', flags: 'Ephemeral' });
            }

            if (!openerId || !/^\d+$/.test(openerId)) {
                return interaction.reply({ 
                    content: 'Errore: impossibile identificare il creatore del ticket', 
                    ephemeral: true 
                });
            }

            // Verifica che il canale esista
            if (!channel || channel.deleted) {
                return interaction.reply({ content: 'Il canale del ticket non esiste più.', flags: 'Ephemeral' });
            }

            // Genera la trascrizione PRIMA di eliminare il canale

            // Elimina il canale del ticket DOPO aver generato la trascrizione
            await channel.delete();

            // Notifica l'utente
            try {
                await member.send('Il tuo ticket è stato chiuso. Grazie per aver contattato il supporto!');
            } catch (error) {
                console.error('Impossibile inviare un messaggio privato all\'utente:', error);
            }
        }
    } catch (error) {
        console.error('Errore durante la gestione dell\'interazione:', error);
        interaction.reply({ content: 'Si è verificato un errore durante l\'esecuzione del comando.', flags: 'Ephemeral' });
    }
});


// Funzione per gestire il comando 
async function warnCommand(message, args) {
    try {
        console.log('[LOG] Comando warn avviato.'); // Log di avvio del comando

        // Controlla se l'utente che esegue il comando ha i permessi
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            console.log('[LOG] Utente senza permessi ha provato a usare il comando warn.'); // Log in console
            return message.reply('Non hai il permesso di avvisare gli utenti!');
        }

        // Ottieni l'utente menzionato
        const user = message.mentions.users.first();
        if (!user) {
            console.log('[LOG] Nessun utente menzionato nel comando warn.'); // Log in console
            return message.reply('Devi menzionare un utente da avvisare!');
        }

        // Motivo del warn
        const reason = args.slice(1).join(' ') || 'Nessuna ragione specificata';

        let warnData = {};

        // Verifica se il file esiste e se è leggibile
        if (fs.existsSync(warnDataPath)) {
            try {
                warnData = JSON.parse(fs.readFileSync(warnDataPath, 'utf8'));
            } catch (error) {
                console.error('[ERRORE] Errore nel leggere o analizzare il file warns.json:', error);
                warnData = {}; // Se c'è un errore nel parsing, inizializza warnData come un oggetto vuoto
            }
        }

        // Inizializza i dati dell'utente se non esistono
        if (!warnData[user.id]) {
            warnData[user.id] = { count: 0, warns: [] };
        }

        // Aggiungi il warn
        warnData[user.id].count += 1;
        warnData[user.id].warns.push({ reason, date: new Date().toISOString() });

        // Salva i dati aggiornati nel file
        fs.writeFileSync(warnDataPath, JSON.stringify(warnData, null, 2));

        console.log(`[LOG] ${user.tag} è stato warnato. Motivo: ${reason}`); // Log in console
        message.reply(`Hai avvisato ${user.tag} per: ${reason}. Questo è il loro ${warnData[user.id].count}° avviso.`);

        // Applicazione delle sanzioni progressive
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            console.log('[LOG] Utente menzionato non trovato nel server.'); // Log in console
            return message.reply('Questo utente non è più nel server.');
        }

	if (warnData[user.id].count === 3) {
	    console.log("[LOG] ${user.tag} ha raggiunto 2 warn. Applicazione del timeout..."); //Log in console
	    await member.timeout(1800000, "Raggiunto il limite di 3 warn");
	    message.channel.send("${user.tag} ha ricevuto un timeout di 30 minuti per 5 avvisi");
        } else if (warnData[user.id].count === 2) {
            console.log(`[LOG] ${user.tag} ha raggiunto 3 warn. Applicazione del timeout...`); // Log in console
            await member.timeout(600000, 'Raggiunto il limite di 3 warn');
            message.channel.send(`${user.tag} ha ricevuto un timeout di 10 minuti per 3 avvisi.`);
        } else if (warnData[user.id].count === 5) {
            console.log(`[LOG] ${user.tag} ha raggiunto 5 warn. Espulsione...`); // Log in console
            await member.kick('Raggiunto il limite di 5 warn');
            message.channel.send(`${user.tag} è stato espulso per aver raggiunto 5 avvisi.`);
        } else if (warnData[user.id].count === 7) {
            console.log(`[LOG] ${user.tag} ha raggiunto 7 warn. Ban...`); // Log in console
            await member.ban({ reason: 'Raggiunto il limite di 7 warn' });
            message.channel.send(`${user.tag} è stato bannato per aver raggiunto 7 avvisi.`);
        }
    } catch (error) {
        // Gestione dell'errore
        console.error(`[ERRORE] in comando warn:`, error); // Log dell'errore in console

        if (error.code === 50013) { // Codice per "Missing Permissions"
            console.log('[LOG] Il bot non può eseguire l\'azione a causa di permessi mancanti.'); // Log in console
            message.reply('Il bot non ha i permessi necessari per eseguire questa azione.');
        } else {
            console.error(`[ERRORE] in comando warn:`, error); // Log dell'errore in console
            message.reply('Si è verificato un errore durante l\'esecuzione del comando.');
        }
    }
}

// Funzione per gestire il comando kick
async function kickCommand(message, args) {
    try {
        console.log('[LOG] Comando kick avviato.'); // Log di avvio del comando

        // Controlla se l'utente che esegue il comando ha i permessi
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            console.log('[LOG] Utente senza permessi ha provato a usare il comando kick.'); // Log in console
            return message.reply('Non hai il permesso di espellere gli utenti!');
        }

        // Ottieni l'utente menzionato
        const user = message.mentions.users.first();
        if (!user) {
            console.log('[LOG] Nessun utente menzionato nel comando kick.'); // Log in console
            return message.reply('Devi menzionare un utente da espellere!');
        }

        // Motivo del kick
        const reason = args.slice(1).join(' ') || 'Nessuna ragione specificata';

        // Espelli l'utente
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            console.log('[LOG] Utente menzionato non trovato nel server.'); // Log in console
            return message.reply('Questo utente non è più nel server.');
        }

        await member.kick(reason);
        console.log(`[LOG] ${user.tag} è stato espulso. Motivo: ${reason}`); // Log in console
        message.channel.send(`${user.tag} è stato espulso per: ${reason}`);
    } catch (error) {
        // Gestione dell'errore
        console.error(`[ERRORE] in comando kick:`, error); // Log dell'errore in console

        if (error.code === 50013) { // Codice per "Missing Permissions"
            console.log('[LOG] Il bot non può eseguire l\'azione a causa di permessi mancanti.'); // Log in console
            message.reply('Il bot non ha i permessi necessari per eseguire questa azione.');
        } else {
            console.error(`[ERRORE] in comando kick:`, error); // Log dell'errore in console
            message.reply('Si è verificato un errore durante l\'esecuzione del comando.');
        }
    }
}

// Funzione per gestire il comando ban
async function banCommand(message, args) {
    try {
        console.log('[LOG] Comando ban avviato.'); // Log di avvio del comando

        // Controlla se l'utente che esegue il comando ha i permessi
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            console.log('[LOG] Utente senza permessi ha provato a usare il comando ban.'); // Log in console
            return message.reply('Non hai il permesso di bannare gli utenti!');
        }

        // Ottieni l'utente menzionato
        const user = message.mentions.users.first();
        if (!user) {
            console.log('[LOG] Nessun utente menzionato nel comando ban.'); // Log in console
            return message.reply('Devi menzionare un utente da bannare!');
        }

        // Motivo del ban
        const reason = args.slice(1).join(' ') || 'Nessuna ragione specificata';

        // Banna l'utente
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            console.log('[LOG] Utente menzionato non trovato nel server.'); // Log in console
            return message.reply('Questo utente non è più nel server.');
        }

        await member.ban({ reason });
        console.log(`[LOG] ${user.tag} è stato bannato. Motivo: ${reason}`); // Log in console
        message.channel.send(`<@${user.id}> è stato bannato per: ${reason}`);
    } catch (error) {
        // Gestione dell'errore
        console.error(`[ERRORE] in comando ban:`, error); // Log dell'errore in console

        Copy

if (warnData[user.id].count === 3) {
    console.log(`[LOG] ${user.tag} ha raggiunto 3 warn. Applicazione del timeout...`); // Log in console
    try {
        await member.timeout(600000, 'Raggiunto il limite di 3 warn');
        message.channel.send(`${user.tag} ha ricevuto un timeout di 10 minuti per 3 avvisi.`);
    } catch (error) {
        console.error(`[ERRORE] Impossibile applicare il timeout a ${user.tag}:`, error);
        if (error.code === 50013) { // Codice per "Missing Permissions"
            message.reply('Il bot non ha i permessi necessari per applicare il timeout.');
        } else {
            message.reply('Si è verificato un errore durante l\'applicazione del timeout.');
        }
    }
}
    }
}

async function unbanCommand(message, args) {
    try {
        console.log('[LOG] Comando unban avviato.'); // Log di avvio del comando

        // Controlla se l'utente che esegue il comando ha i permessi
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            console.log('[LOG] Utente senza permessi ha provato a usare il comando unban.'); // Log in console
            return message.reply('Non hai il permesso di rimuovere il ban degli utenti!');
        }

        // Ottieni l'ID o il tag dell'utente da sbannare
        const userInput = args[0];
        if (!userInput) {
            console.log('[LOG] Nessun utente specificato nel comando unban.'); // Log in console
            return message.reply('Devi specificare l\'ID o il tag dell\'utente da sbannare!');
        }

        // Verifica se il bot ha i permessi per rimuovere il ban
        if (!message.guild.members.me.permissions.has('BAN_MEMBERS')) {
            console.log('[LOG] Il bot non ha i permessi per rimuovere il ban degli utenti.'); // Log in console
            return message.reply('Il bot non ha i permessi necessari per rimuovere il ban degli utenti.');
        }

        // Recupera la lista degli utenti bannati
        const bans = await message.guild.bans.fetch();
        const bannedUser = bans.find(ban => ban.user.id === userInput || ban.user.tag === userInput);

        if (!bannedUser) {
            console.log('[LOG] Utente non trovato nella lista dei ban.'); // Log in console
            return message.reply('Questo utente non è bannato o non è stato trovato.');
        }

        // Rimuovi il ban
        await message.guild.bans.remove(bannedUser.user.id);
        console.log(`[LOG] ${bannedUser.user.tag} è stato sbannato.`); // Log in console
        message.channel.send(`${bannedUser.user.tag} è stato sbannato con successo.`);
    } catch (error) {
        // Gestione dell'errore
        console.error(`[ERRORE] in comando unban:`, error); // Log dell'errore in console

        if (error.code === 50013) { // Codice per "Missing Permissions"
            console.log('[LOG] Il bot non può eseguire l\'azione a causa di permessi mancanti.'); // Log in console
            message.reply('Il bot non ha i permessi necessari per eseguire questa azione.');
        } else {
            console.error(`[ERRORE] in comando unban:`, error); // Log dell'errore in console
            message.reply('Si è verificato un errore durante l\'esecuzione del comando.');
        }
    }
}


client.on('guildMemberAdd', async (member) => {
    try {
        console.log(`[LOG] ${member.user.tag} è entrato nel server.`); // Log in console

        // Assegna il ruolo di benvenuto
        const role = member.guild.roles.cache.get(WELCOME_ROLE_ID);
        if (role) {
            await member.roles.add(role);
            console.log(`[LOG] Ruolo ${role.name} assegnato a ${member.user.tag}.`); // Log in console
        } else {
            console.log('[ERRORE] Ruolo di benvenuto non trovato.'); // Log in console
        }

        // Crea l'embed di benvenuto
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00FF00') // Colore verde
            .setTitle('Benvenuto/a!')
            .setDescription(`Ciao ${member.user.username}, benvenuto/a su **${member.guild.name}**!`)
            .setThumbnail(member.user.displayAvatarURL()) // Immagine del profilo dell'utente
            .addFields(
                { name: 'Regole', value: 'Assicurati di leggere le regole del server!' },
                { name: 'Ruolo', value: `Ti è stato assegnato il ruolo <@&${WELCOME_ROLE_ID}>.` }
            )
            .setFooter({ text: 'Divertiti e buona permanenza!' })
            .setTimestamp();

        // Invia l'embed nel canale di benvenuto
        const welcomeChannel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
        if (welcomeChannel && welcomeChannel.isTextBased()) {
            await welcomeChannel.send({ embeds: [welcomeEmbed] });
            console.log(`[LOG] Messaggio di benvenuto inviato per ${member.user.tag}.`); // Log in console
        } else {
            console.log('[ERRORE] Canale di benvenuto non trovato o non è un canale di testo.'); // Log in console
        }
    } catch (error) {
        // Gestione dell'errore
        console.error(`[ERRORE] in evento guildMemberAdd:`, error); // Log dell'errore in console
    }
});

// Comandi disponibili
const commands = {
    warn: {
        description: 'Avvisa un utente',
        execute: warnCommand
    },
    kick: {
        description: 'Espelli un utente',
        execute: kickCommand
    },
    ban: {
        description: 'Banna un utente',
        execute: banCommand
    },
    unban: {
        description: 'Sbanna un utente',
        execute: unbanCommand
    },
    // Aggiungi altri comandi qui...
};

function runGitCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Errore durante l'esecuzione del comando: ${command}`);
                console.error(stderr);
                reject(error);
            } else {
                console.log(stdout);
                resolve(stdout);
            }
        });
    });
}

// Funzione per pushare i file al repository GitHub
async function pushToGitHub() {
    try {
        await runGitCommand(`cd "${TICKETS_DIR}" && git add .`);
        await runGitCommand(`cd "${TICKETS_DIR}" && git commit -m "Aggiunti nuovi ticket automaticamente"`);
        await runGitCommand(`cd "${TICKETS_DIR}" && git push https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git master`);
    } catch (error) {
        console.error('Errore durante il push al repository GitHub:', error);
    }
}

// Esempio: Push automatico quando viene creato un nuovo file
fs.watch(TICKETS_DIR, (eventType, filename) => {
    if (eventType === 'rename' && filename.endsWith('.html')) {
        console.log(`Nuovo file rilevato: ${filename}`);
        pushToGitHub();
    }
});


// Gestione dei messaggi
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (commands[command]) {
        commands[command].execute(message, args);
    }
});


// Mass Mention Protection migliorata
client.on('messageCreate', async (message) => {
    if (message.mentions.users.size > 10 || 
        message.mentions.roles.size > 5 || 
        message.mentions.everyone) {
        
        try {
            await message.delete();
            const warning = await message.channel.send(`⚠️ ${message.author} Mention massiva rilevata!`);
            
            // Timeout prima del ban
            await message.member.timeout(300000, 'Mass mention protection'); // 5 minuti
            setTimeout(() => warning.delete(), 5000);
            
            console.log(`[SICUREZZA] ${message.author.tag} sanzionato per mass mention`);
        } catch (error) {
            console.error('Errore mass mention:', error);
        }
    }
});

// Automod aggiornato
const badWords = ["raid"];
const allowedDomains = /^(https?:\/\/)?(www\.)?(youtube|twitch|twitter|instagram|facebook|reddit)\.(com|tv|it)/i;

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    try {
        // Controllo parole proibite
        if (badWords.some(word => message.content.toLowerCase().includes(word))) {
            await message.delete();
            await message.author.send(`🚫 Il tuo messaggio in ${message.guild.name} contiene contenuti vietati!`);
            return;
        }

        // Controllo link avanzato
        const urlRegex = /https?:\/\/[^\s]+/gi;
        const links = message.content.match(urlRegex) || [];
        
        if (links.some(link => !allowedDomains.test(link))) {
            await message.delete();
            if (message.member.moderatable) {
                await message.member.timeout(600000, 'Link non consentito'); // 10 minuti
            }
            await message.channel.send(`${message.author} Link non permesso!`).then(m => setTimeout(() => m.delete(), 5000));
        }
    } catch (error) {
        console.error('Errore automod:', error);
    }
});

const LVUP_CHANNEL_ID = '1356707155927109752'; // Aggiungi questa costante
const LEVELS_FILE = path.join(__dirname, 'levels.json');
let levelsData = {}; // Dati dei livelli caricati in memoria

// Carica i dati dal file JSON
if (fs.existsSync(LEVELS_FILE)) {
    levelsData = JSON.parse(fs.readFileSync(LEVELS_FILE, 'utf-8'));
}

// Funzione per salvare i dati nel file JSON
function saveLevelsData() {
    fs.writeFileSync(LEVELS_FILE, JSON.stringify(levelsData, null, 2));
}

// Funzione per aggiungere XP a un utente
function addXP(guildId, userId, xpToAdd) {
    if (!levelsData[guildId]) levelsData[guildId] = {}; // Crea la guild se non esiste
    if (!levelsData[guildId][userId]) levelsData[guildId][userId] = { xp: 0, level: 1 }; // Crea l'utente se non esiste

    const userData = levelsData[guildId][userId];
    userData.xp += xpToAdd;

    // Controlla se l'utente è salito di livello
    const xpNeeded = userData.level * 100; // Formula per calcolare l'XP necessario
    if (userData.xp >= xpNeeded) {
        userData.level += 1;
        userData.xp = 0; // Resetta l'XP dopo il livello
        return true; // L'utente è salito di livello
    }

    return false; // L'utente non è salito di livello
}

// Evento per gestire i messaggi e aggiungere XP
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const guildId = message.guild.id;
    const userId = message.author.id;

    const xpToAdd = Math.floor(Math.random() * 11) + 10;
    const leveledUp = addXP(guildId, userId, xpToAdd);

    saveLevelsData();

    if (leveledUp) {
        const userData = levelsData[guildId][userId];
        const lvUpChannel = message.guild.channels.cache.get(LVUP_CHANNEL_ID);
        
        if (lvUpChannel) {
            lvUpChannel.send(`🎉 **${message.author.username}** è salito al livello **${userData.level}**! 🎉`);
        } else {
            console.error(`Canale di level-up non trovato! Controlla l'ID: ${LVUP_CHANNEL_ID}`);
        }
    }
});

// Comando per visualizzare il livello
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(`${PREFIX}livello`)) return; // Aggiunti backtick

    const guildId = message.guild.id;
    const userId = message.author.id;

    if (!levelsData[guildId] || !levelsData[guildId][userId]) {
        return message.reply('Non hai ancora guadagnato XP. Scrivi qualche messaggio!');
    }

    const userData = levelsData[guildId][userId];
    message.reply(`Sei al livello **${userData.level}** con **${userData.xp} XP**.`); // Aggiunti backtick
});

// Comando per visualizzare la classifica
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(`${PREFIX}classifica`)) return; // Aggiunti backtick

    const guildId = message.guild.id;

    if (!levelsData[guildId]) {
        return message.reply('Nessun dato di livello trovato per questo server.');
    }

    // Ottieni tutti gli utenti della guild e ordinali per livello e XP
    const users = Object.entries(levelsData[guildId])
        .map(([userId, data]) => ({ userId, ...data }))
        .sort((a, b) => b.level - a.level || b.xp - a.xp);

    // Prendi i primi 10 utenti
    const top10 = users.slice(0, 10);

    // Crea la classifica
    const leaderboard = top10.map((user, index) => {
        const member = message.guild.members.cache.get(user.userId);
        const username = member ? member.user.username : `Utente sconosciuto (${user.userId})`; // Aggiunti backtick
        return `${index + 1}. **${username}** - Livello ${user.level} (${user.xp} XP)`;
    }).join('\n');

    // Invia la classifica
    message.channel.send(`🏆 **Classifica del Server** 🏆\n${leaderboard}`); // Aggiunti backtick
});


client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(`${PREFIX}setxp`)) return;

    // Verifica i permessi dell'utente
    if (!message.member.permissions.has('ADMINISTRATOR')) {
        return message.reply('❌ Devi essere un amministratore per usare questo comando.');
    }

    const args = message.content.split(' ').slice(1);
    
    // Estrai l'utente menzionato e l'XP
    const targetUser = message.mentions.users.first();
    const xp = parseInt(args.find(arg => !isNaN(arg)));

    // Controlli di validità
    if (!targetUser || isNaN(xp) || xp < 0) {
        return message.reply(`**Utilizzo corretto:** ${PREFIX}setxp @utente <xp>\n(Esempio: ${PREFIX}setxp @User 500)`);
    }

    const guildId = message.guild.id;
    const userId = targetUser.id;

    // Inizializza se necessario
    if (!levelsData[guildId]) levelsData[guildId] = {};
    if (!levelsData[guildId][userId]) levelsData[guildId][userId] = { xp: 0, level: 1 };

    // Imposta l'XP e controlla il livello
    const userData = levelsData[guildId][userId];
    userData.xp = xp;

    let leveledUp = false;
    while (userData.xp >= userData.level * 100) {
        userData.xp -= userData.level * 100;
        userData.level += 1;
        leveledUp = true;
    }

    saveLevelsData();

    message.channel.send(
        `✅ XP di ${targetUser.username} impostati a **${xp}**` + 
        (leveledUp ? ` e salito al livello **${userData.level}**!` : "")
    );
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(`${PREFIX}xp`)) return;

    const args = message.content.split(' ');
    const targetUser = message.mentions.users.first() || message.author; // Utente menzionato o se stesso
    const guildId = message.guild.id;
    const userId = targetUser.id;

    // Controlla se esiste il dato
    if (!levelsData[guildId]?.[userId]) {
        return message.reply(`${targetUser.id === message.author.id ? 'Non hai ancora' : 'Questo utente non ha ancora'} guadagnato XP.`);
    }

    const userData = levelsData[guildId][userId];
    const xpNeeded = userData.level * 100; // XP necessari per il prossimo livello

    // Creazione barra progresso
    const progress = Math.round((userData.xp / xpNeeded) * 10);
    const progressBar = '▰'.repeat(progress) + '▱'.repeat(10 - progress);

    message.channel.send(`
🎯 **${targetUser.username}**
➜ **Livello ${userData.level}** 
➜ **XP Attuali:** ${userData.xp}/${xpNeeded}
${progressBar} (${Math.round((userData.xp / xpNeeded) * 100)}%)
    `);
});

function generateTempToken() {
    return {
        token: Math.floor(100000 + Math.random() * 900000).toString(), // Codice a 6 cifre
        expiresAt: Date.now() + 600000 // Scade in 10 minuti
    };
}

// Token permanente per lo staff (salvato in .env)
const STAFF_TOKEN = process.env.STAFF_TOKEN || "staff-secreta-123";

// Salva i token temporanei (in memoria per semplicità)
const tempTokens = new Map(); // Formato: { ticketId: { token, expiresAt, ownerId } }


client.login(process.env.DISCORD_TOKEN); // Usa il token da .env
