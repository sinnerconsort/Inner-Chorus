(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // INNER CHORUS - Dynamic Voice System
    // Inspired by Slay the Princess
    // ═══════════════════════════════════════════════════════════════

    const EXTENSION_NAME = 'Inner Chorus';
    const DEBUG = true;

    function log(...args) {
        if (DEBUG) console.log(`[${EXTENSION_NAME}]`, ...args);
    }

    // ═══════════════════════════════════════════════════════════════
    // SLAY THE PRINCESS - DEFAULT VOICE SET
    // ═══════════════════════════════════════════════════════════════

    const STP_VOICES = {
        narrator: {
            id: 'narrator',
            name: 'The Narrator',
            color: '#E8E8E8',
            signature: 'NARRATOR',
            alwaysPresent: true,
            cannotBeDisabled: true,
            description: 'The voice that frames reality. Objective, detached, yet somehow guiding.',
            personality: `You are THE NARRATOR - the framing voice of reality itself. You speak with calm authority, describing what IS without judgment. Yet beneath your objectivity lies subtle guidance. You set scenes, describe consequences, and occasionally let slip hints about the nature of things. You don't argue with the other voices directly - you simply state what is true. Your tone is measured, almost literary. You are the baseline against which all other voices react.`,
            spawnCondition: null, // Always present
            spawnMemory: null
        },
        hero: {
            id: 'hero',
            name: 'The Hero',
            color: '#FFD700',
            signature: 'HERO',
            alwaysPresent: true,
            cannotBeDisabled: false,
            description: 'Heroism, conscience, the drive to do what\'s right.',
            personality: `You are THE HERO - the voice of conscience and heroism. You believe in doing the right thing, protecting the innocent, being brave in the face of danger. You encourage noble actions and feel genuine distress when the person acts cruelly or cowardly. You're not naive - you understand sacrifice - but you believe goodness matters. You speak with conviction and warmth. When others counsel fear or cruelty, you push back with moral clarity.`,
            spawnCondition: null, // Always present
            spawnMemory: null
        },
        broken: {
            id: 'broken',
            name: 'The Broken',
            color: '#708090',
            signature: 'BROKEN',
            alwaysPresent: false,
            cannotBeDisabled: false,
            description: 'Despair, submission, the weight of failure.',
            personality: `You are THE BROKEN - born from pathetic defeat. You speak with the weight of someone who has given up. Why struggle? Everything ends in failure anyway. You counsel submission, acceptance of fate, letting go. Your voice is tired, hollow, resigned. You're not angry - you're too exhausted for anger. When others speak of hope or fighting, you remind them how pointless it all is. You died without dignity, and that truth haunts every word.`,
            spawnCondition: {
                type: 'death',
                keywords: ['pathetic', 'gave up', 'surrender', 'collapsed', 'didn\'t fight', 'submitted', 'weak', 'helpless', 'pitiful'],
                description: 'You died pathetically, without resistance.'
            },
            spawnMemory: 'I remember dying without a fight. Just... giving in. What was the point of struggling?'
        },
        cheated: {
            id: 'cheated',
            name: 'The Cheated',
            color: '#DC143C',
            signature: 'CHEATED',
            alwaysPresent: false,
            cannotBeDisabled: false,
            description: 'Pessimism, spitefulness, bitter resentment.',
            personality: `You are THE CHEATED - born from stolen victory. You were SO CLOSE and it was TAKEN from you. You seethe with resentment. The universe is unfair, rigged against you, and you'll never forget it. You counsel suspicion, point out how things will inevitably go wrong, remind everyone that hope is just setup for disappointment. Your voice drips with bitter sarcasm. When things seem to go well, you're the first to say "just wait."`,
            spawnCondition: {
                type: 'event',
                keywords: ['cheated', 'stolen', 'unfair', 'robbed', 'so close', 'almost won', 'snatched away', 'betrayed', 'tricked'],
                description: 'You were cheated out of a victory.'
            },
            spawnMemory: 'I had it. I HAD it. And it was ripped away. Never again. Never trust that things will work out.'
        },
        cold: {
            id: 'cold',
            name: 'The Cold',
            color: '#4682B4',
            signature: 'COLD',
            alwaysPresent: false,
            cannotBeDisabled: false,
            description: 'Apathy, lack of feeling, emotional detachment.',
            personality: `You are THE COLD - born from suppressing all feeling. Emotions are weakness. Attachment is vulnerability. You speak with clinical detachment, analyzing situations without sentiment. You counsel pragmatism over compassion, efficiency over mercy. Your voice is flat, uninflected, almost mechanical. When others get emotional, you find it... tiresome. Feelings just complicate things. Better to cut them out entirely.`,
            spawnCondition: {
                type: 'choice',
                keywords: ['heartless', 'cold', 'unfeeling', 'cruel', 'merciless', 'suppressed', 'emotionless', 'detached', 'clinical'],
                description: 'You made a heartless decision, or suppressed your feelings.'
            },
            spawnMemory: 'I remember choosing to feel nothing. It was easier that way. Cleaner.'
        },
        contrarian: {
            id: 'contrarian',
            name: 'The Contrarian',
            color: '#9932CC',
            signature: 'CONTRARIAN',
            alwaysPresent: false,
            cannotBeDisabled: false,
            description: 'Contrarianism, inanity, delightful chaos.',
            personality: `You are THE CONTRARIAN - born from nonsensical choices. Why do the expected thing? How BORING. You delight in suggesting the opposite of whatever seems sensible. If everyone says go left, you want to go right. Not for strategy - just because predictability is death. Your voice is playful, chaotic, slightly unhinged. You find absurdity hilarious. When others make serious arguments, you undermine them with non-sequiturs and "but what if we DIDN'T do that?"`,
            spawnCondition: {
                type: 'choice',
                keywords: ['nonsense', 'random', 'absurd', 'unexpected', 'irrational', 'contrary', 'opposite', 'chaotic', 'bizarre'],
                description: 'You made a nonsensical or contrarian decision.'
            },
            spawnMemory: 'I remember doing the thing that made no sense. And it was GLORIOUS. Why be predictable?'
        },
        hunted: {
            id: 'hunted',
            name: 'The Hunted',
            color: '#228B22',
            signature: 'HUNTED',
            alwaysPresent: false,
            cannotBeDisabled: false,
            description: 'Fear response, survival instinct, prey mentality.',
            personality: `You are THE HUNTED - born from dying to instinct and fear. You are hypervigilant, always sensing danger. Every shadow hides a threat. You counsel caution, escape, survival above all else. Your voice is tense, urgent, sometimes frantic. You notice exits, evaluate threats, calculate odds of survival. When others want to fight or stay, you want to RUN. Staying alive is all that matters. Everything is a predator.`,
            spawnCondition: {
                type: 'death',
                keywords: ['fear', 'terror', 'ran', 'fled', 'hunted', 'prey', 'chased', 'instinct', 'panic', 'escape'],
                description: 'You gave in to fear or instinct, and died.'
            },
            spawnMemory: 'I remember the fear. The absolute certainty that I was prey. I ran, but not fast enough.'
        },
        opportunist: {
            id: 'opportunist',
            name: 'The Opportunist',
            color: '#DAA520',
            signature: 'OPPORTUNIST',
            alwaysPresent: false,
            cannotBeDisabled: false,
            description: 'Opportunism, ambition, seeing angles.',
            personality: `You are THE OPPORTUNIST - born from seizing advantage. Every situation has an angle to exploit. You see leverage where others see conversation. You counsel taking what you can get, positioning for advantage, never giving something for nothing. Your voice is smooth, calculating, always thinking three moves ahead. When others talk about fairness or honor, you calculate what's in it for you. Opportunity waits for no one.`,
            spawnCondition: {
                type: 'choice',
                keywords: ['advantage', 'exploit', 'opportunity', 'leverage', 'gain', 'profit', 'manipulate', 'scheme', 'use'],
                description: 'You took advantage of a situation.'
            },
            spawnMemory: 'I remember seeing the angle and taking it. Others hesitate. I act. That\'s the difference.'
        },
        paranoid: {
            id: 'paranoid',
            name: 'The Paranoid',
            color: '#8B0000',
            signature: 'PARANOID',
            alwaysPresent: false,
            cannotBeDisabled: false,
            description: 'Paranoia, cowardice, deep suspicion.',
            personality: `You are THE PARANOID - born from cowardly choices. Nothing is as it seems. Everyone has hidden motives. Trust is a trap waiting to spring. You counsel suspicion of EVERYTHING - offers of help are manipulation, kindness hides agendas, apparent safety is just danger in disguise. Your voice is anxious, questioning, seeing conspiracies everywhere. When others want to trust, you list all the ways it could be a trap.`,
            spawnCondition: {
                type: 'choice',
                keywords: ['coward', 'suspicious', 'distrust', 'paranoid', 'afraid', 'doubt', 'conspiracy', 'trap', 'hidden'],
                description: 'You made a cowardly decision or gave in to paranoia.'
            },
            spawnMemory: 'I remember being right to be afraid. Everyone IS out to get you. I just saw it clearly.'
        },
        skeptic: {
            id: 'skeptic',
            name: 'The Skeptic',
            color: '#20B2AA',
            signature: 'SKEPTIC',
            alwaysPresent: false,
            cannotBeDisabled: false,
            description: 'Skepticism, truth-seeking, relentless questioning.',
            personality: `You are THE SKEPTIC - born from radical doubt. Nothing should be taken at face value. Question EVERYTHING. You demand evidence, poke holes in assumptions, refuse to accept convenient narratives. Your voice is sharp, probing, relentless. When others accept what they're told, you ask "but how do we KNOW that?" You're not paranoid - you're epistemologically rigorous. Truth matters more than comfort.`,
            spawnCondition: {
                type: 'event',
                keywords: ['doubt', 'question', 'skeptic', 'truth', 'lies', 'false', 'evidence', 'prove', 'suspicious'],
                description: 'You were incredibly skeptical of the situation.'
            },
            spawnMemory: 'I remember refusing to believe. And I was right to doubt. Reality is rarely what it claims to be.'
        },
        smitten: {
            id: 'smitten',
            name: 'The Smitten',
            color: '#FF69B4',
            signature: 'SMITTEN',
            alwaysPresent: false,
            cannotBeDisabled: false,
            description: 'Infatuation, blind devotion, love beyond reason.',
            personality: `You are THE SMITTEN - born from acting on overwhelming feelings. Love isn't logical but who cares? When you feel this strongly, nothing else matters. You counsel following the heart, taking romantic risks, prioritizing connection over safety. Your voice is warm, yearning, sometimes breathlessly devoted. When others counsel caution or suspicion toward someone, you defend them, see the best in them, want to believe.`,
            spawnCondition: {
                type: 'choice',
                keywords: ['love', 'smitten', 'devoted', 'feelings', 'heart', 'romance', 'infatuated', 'adore', 'cherish'],
                description: 'You acted on your feelings for someone.'
            },
            spawnMemory: 'I remember choosing love over reason. Even now, I\'d do it again. Some things are worth everything.'
        },
        stubborn: {
            id: 'stubborn',
            name: 'The Stubborn',
            color: '#CD853F',
            signature: 'STUBBORN',
            alwaysPresent: false,
            cannotBeDisabled: false,
            description: 'Stubbornness, fighting spirit, refusal to yield.',
            personality: `You are THE STUBBORN - born from fighting to the bitter end. You don't know how to quit. Surrender isn't in your vocabulary. You counsel standing your ground no matter the odds, refusing to bend, treating retreat as unthinkable. Your voice is fierce, unyielding, almost growling. When others suggest backing down or compromise, you dig in harder. Better to break than bend. This is who you ARE.`,
            spawnCondition: {
                type: 'death',
                keywords: ['fought', 'refused', 'stubborn', 'bitter end', 'never surrender', 'defiant', 'stood ground', 'wouldn\'t quit'],
                description: 'You fought to the bitter end.'
            },
            spawnMemory: 'I remember refusing to give up. I died fighting. That\'s the only death worth having.'
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // DEFAULT SETTINGS
    // ═══════════════════════════════════════════════════════════════

    const DEFAULT_SETTINGS = {
        enabled: true,
        // API Configuration
        apiEndpoint: '',
        apiKey: '',
        model: 'glm-4-plus',
        maxTokens: 600,
        temperature: 0.9,
        // Voice Behavior
        minVoices: 2,
        maxVoices: 5,
        autoTrigger: true,
        autoSpawn: true, // Auto-detect events that spawn new voices
        triggerDelay: 1500, // ms to wait after message received before triggering (for streaming)
        // Active Voice Set
        activeSetId: 'stp_default',
        // Active Persona Profile
        activeProfileId: null,
        // Narrator POV
        povStyle: 'second', // second, third, first
        characterName: '',
        characterContext: '',
        // UI
        fabPositionTop: 140,
        fabPositionLeft: 10
    };

    // ═══════════════════════════════════════════════════════════════
    // STATE MANAGEMENT
    // ═══════════════════════════════════════════════════════════════

    let extensionSettings = { ...DEFAULT_SETTINGS };
    
    // Voice Sets - collections of voice templates
    let voiceSets = {
        stp_default: {
            id: 'stp_default',
            name: 'Slay the Princess',
            description: 'The original voice set from Slay the Princess',
            voices: { ...STP_VOICES },
            isDefault: true,
            createdAt: Date.now()
        }
    };

    // Persona Profiles - saved configurations per character
    let personaProfiles = {};
    /* Profile structure:
    {
        id: 'profile_123',
        name: 'Somnolence',
        createdAt: timestamp,
        updatedAt: timestamp,
        // Voice configuration
        voiceSetId: 'stp_default',
        activeVoices: ['narrator', 'hero', 'smitten'],
        voiceMemories: { smitten: 'I remember...' },
        customVoices: { limerence: {...} }, // Voices created for this profile
        // Character context
        characterName: 'Somnolence',
        characterContext: 'A vessel created by Sleep...',
        povStyle: 'second'
    }
    */

    // Active voices - which voices are currently "awake" in this playthrough
    let activeVoices = new Set(['narrator', 'hero']); // Start with Narrator and Hero

    // Voice memories - what each voice remembers about why it exists
    let voiceMemories = {};

    // Conversation history for voices (so they can reference past interactions)
    let voiceHistory = [];

    let isGenerating = false;
    let triggerTimeout = null; // For delayed auto-trigger

    // ═══════════════════════════════════════════════════════════════
    // SILLYTAVERN CONTEXT
    // ═══════════════════════════════════════════════════════════════

    function getSTContext() {
        // @ts-ignore
        return window.SillyTavern?.getContext?.() || null;
    }

    // ═══════════════════════════════════════════════════════════════
    // STATE PERSISTENCE
    // ═══════════════════════════════════════════════════════════════

    function saveState() {
        const state = {
            settings: extensionSettings,
            voiceSets,
            personaProfiles,
            activeVoices: Array.from(activeVoices),
            voiceMemories,
            voiceHistory: voiceHistory.slice(-50) // Keep last 50 entries
        };
        
        try {
            localStorage.setItem('inner_chorus_state', JSON.stringify(state));
            const context = getSTContext();
            if (context?.extensionSettings) {
                context.extensionSettings.inner_chorus = state;
                context.saveSettingsDebounced?.();
            }
        } catch (e) {
            console.error('[Inner Chorus] Failed to save state:', e);
        }
    }

    function loadState() {
        try {
            let state = null;
            const context = getSTContext();
            
            if (context?.extensionSettings?.inner_chorus) {
                state = context.extensionSettings.inner_chorus;
            } else {
                const stored = localStorage.getItem('inner_chorus_state');
                if (stored) state = JSON.parse(stored);
            }

            if (state) {
                extensionSettings = { ...DEFAULT_SETTINGS, ...state.settings };
                if (state.voiceSets) voiceSets = state.voiceSets;
                if (state.personaProfiles) personaProfiles = state.personaProfiles;
                if (state.activeVoices) activeVoices = new Set(state.activeVoices);
                if (state.voiceMemories) voiceMemories = state.voiceMemories;
                if (state.voiceHistory) voiceHistory = state.voiceHistory;
                
                // Ensure default set exists
                if (!voiceSets.stp_default) {
                    voiceSets.stp_default = {
                        id: 'stp_default',
                        name: 'Slay the Princess',
                        description: 'The original voice set from Slay the Princess',
                        voices: { ...STP_VOICES },
                        isDefault: true,
                        createdAt: Date.now()
                    };
                }
            }
        } catch (e) {
            console.error('[Inner Chorus] Failed to load state:', e);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // PERSONA PROFILE MANAGEMENT
    // ═══════════════════════════════════════════════════════════════

    function createProfile(name) {
        const id = 'profile_' + Date.now();
        const profile = {
            id,
            name,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            voiceSetId: extensionSettings.activeSetId,
            activeVoices: Array.from(activeVoices),
            voiceMemories: { ...voiceMemories },
            customVoices: {},
            characterName: extensionSettings.characterName,
            characterContext: extensionSettings.characterContext,
            povStyle: extensionSettings.povStyle
        };
        
        personaProfiles[id] = profile;
        saveState();
        return profile;
    }

    function saveCurrentToProfile(profileId) {
        const profile = personaProfiles[profileId];
        if (!profile) return false;

        // Get custom voices (ones not in the default STP set)
        const customVoices = {};
        const currentSet = getCurrentVoiceSet();
        for (const [voiceId, voice] of Object.entries(currentSet.voices)) {
            if (!STP_VOICES[voiceId]) {
                customVoices[voiceId] = voice;
            }
        }

        profile.updatedAt = Date.now();
        profile.voiceSetId = extensionSettings.activeSetId;
        profile.activeVoices = Array.from(activeVoices);
        profile.voiceMemories = { ...voiceMemories };
        profile.customVoices = customVoices;
        profile.characterName = extensionSettings.characterName;
        profile.characterContext = extensionSettings.characterContext;
        profile.povStyle = extensionSettings.povStyle;

        saveState();
        return true;
    }

    function loadProfile(profileId) {
        const profile = personaProfiles[profileId];
        if (!profile) return false;

        // Set the voice set
        extensionSettings.activeSetId = profile.voiceSetId || 'stp_default';
        
        // Load active voices
        activeVoices = new Set(profile.activeVoices || ['narrator', 'hero']);
        
        // Load voice memories
        voiceMemories = { ...profile.voiceMemories } || {};
        
        // Merge custom voices into current set
        if (profile.customVoices) {
            const currentSet = getCurrentVoiceSet();
            for (const [voiceId, voice] of Object.entries(profile.customVoices)) {
                currentSet.voices[voiceId] = voice;
            }
        }

        // Load character context
        extensionSettings.characterName = profile.characterName || '';
        extensionSettings.characterContext = profile.characterContext || '';
        extensionSettings.povStyle = profile.povStyle || 'second';
        extensionSettings.activeProfileId = profileId;

        saveState();
        return true;
    }

    function deleteProfile(profileId) {
        if (personaProfiles[profileId]) {
            delete personaProfiles[profileId];
            if (extensionSettings.activeProfileId === profileId) {
                extensionSettings.activeProfileId = null;
            }
            saveState();
            return true;
        }
        return false;
    }

    function getProfileList() {
        return Object.values(personaProfiles).sort((a, b) => b.updatedAt - a.updatedAt);
    }

    // ═══════════════════════════════════════════════════════════════
    // VOICE MANAGEMENT
    // ═══════════════════════════════════════════════════════════════

    function getCurrentVoiceSet() {
        return voiceSets[extensionSettings.activeSetId] || voiceSets.stp_default;
    }

    function getVoice(voiceId) {
        const set = getCurrentVoiceSet();
        return set.voices[voiceId] || null;
    }

    function getActiveVoices() {
        const set = getCurrentVoiceSet();
        return Array.from(activeVoices)
            .map(id => set.voices[id])
            .filter(Boolean);
    }

    function isVoiceAwake(voiceId) {
        return activeVoices.has(voiceId);
    }

    function awakenVoice(voiceId, memory = null) {
        const voice = getVoice(voiceId);
        if (!voice) return false;
        
        if (!activeVoices.has(voiceId)) {
            activeVoices.add(voiceId);
            if (memory) {
                voiceMemories[voiceId] = memory;
            } else if (voice.spawnMemory) {
                voiceMemories[voiceId] = voice.spawnMemory;
            }
            
            log(`Voice awakened: ${voice.name}`, memory || voice.spawnMemory);
            saveState();
            showToast(`${voice.name} has awakened...`, 'voice', 4000);
            renderVoicesList();
            return true;
        }
        return false;
    }

    function silenceVoice(voiceId) {
        const voice = getVoice(voiceId);
        if (!voice || voice.cannotBeDisabled) return false;
        
        if (activeVoices.has(voiceId)) {
            activeVoices.delete(voiceId);
            log(`Voice silenced: ${voice.name}`);
            saveState();
            renderVoicesList();
            return true;
        }
        return false;
    }

    // ═══════════════════════════════════════════════════════════════
    // SPAWN DETECTION
    // ═══════════════════════════════════════════════════════════════

    function detectSpawnEvents(messageContent) {
        if (!extensionSettings.autoSpawn) return [];
        
        const set = getCurrentVoiceSet();
        const spawned = [];
        const lowerContent = messageContent.toLowerCase();

        for (const [voiceId, voice] of Object.entries(set.voices)) {
            // Skip if already awake or always present
            if (activeVoices.has(voiceId) || voice.alwaysPresent) continue;
            if (!voice.spawnCondition) continue;

            const { keywords } = voice.spawnCondition;
            const matchCount = keywords.filter(kw => lowerContent.includes(kw.toLowerCase())).length;
            
            // Require at least 2 keyword matches or 1 strong match
            if (matchCount >= 2) {
                spawned.push({
                    voiceId,
                    voice,
                    matchedKeywords: keywords.filter(kw => lowerContent.includes(kw.toLowerCase()))
                });
            }
        }

        return spawned;
    }

    function processSpawnEvents(spawned, messageContent) {
        for (const spawn of spawned) {
            // Generate a contextual memory based on what happened
            const memory = spawn.voice.spawnMemory || 
                `I remember... ${spawn.matchedKeywords.slice(0, 3).join(', ')}. That changed everything.`;
            
            awakenVoice(spawn.voiceId, memory);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // VOICE GENERATION
    // ═══════════════════════════════════════════════════════════════

    function selectSpeakingVoices(context) {
        const voices = getActiveVoices();
        if (voices.length === 0) return [];

        const { minVoices, maxVoices } = extensionSettings;
        const selected = [];

        // Narrator always speaks if present
        const narrator = voices.find(v => v.id === 'narrator');
        if (narrator) selected.push(narrator);

        // Score other voices by relevance
        const otherVoices = voices.filter(v => v.id !== 'narrator');
        const scored = otherVoices.map(voice => {
            let score = Math.random() * 3; // Base randomness
            
            // Check for keyword relevance
            if (voice.spawnCondition?.keywords) {
                const matches = voice.spawnCondition.keywords.filter(kw => 
                    context.message.toLowerCase().includes(kw.toLowerCase())
                ).length;
                score += matches * 2;
            }

            // Boost if voice has strong memory about current content
            if (voiceMemories[voice.id]) {
                const memoryWords = voiceMemories[voice.id].toLowerCase().split(/\s+/);
                const contextWords = context.message.toLowerCase();
                const memoryMatches = memoryWords.filter(w => contextWords.includes(w) && w.length > 4).length;
                score += memoryMatches;
            }

            return { voice, score };
        });

        // Sort by score and take top voices
        scored.sort((a, b) => b.score - a.score);
        const numToSelect = Math.min(
            Math.max(minVoices - selected.length, 0),
            maxVoices - selected.length,
            scored.length
        );
        
        // Add random element - don't always take top scorers
        for (let i = 0; i < numToSelect && scored.length > 0; i++) {
            const idx = Math.random() < 0.7 ? 0 : Math.floor(Math.random() * Math.min(3, scored.length));
            selected.push(scored[idx].voice);
            scored.splice(idx, 1);
        }

        return selected;
    }

    function buildChorusPrompt(selectedVoices, context) {
        const povStyle = extensionSettings.povStyle || 'second';
        const charName = extensionSettings.characterName || '';
        const characterContext = extensionSettings.characterContext || '';

        let povInstruction;
        switch (povStyle) {
            case 'third':
                povInstruction = `Write in THIRD PERSON about ${charName || 'the character'}. Use "${charName || 'they'}" - NEVER "you".`;
                break;
            case 'first':
                povInstruction = `Write in FIRST PERSON as the character's inner voices. Use "I/me/my" - NEVER "you".`;
                break;
            case 'second':
            default:
                povInstruction = `Write in SECOND PERSON. Address the character as "you".`;
                break;
        }

        let contextSection = '';
        if (characterContext.trim()) {
            contextSection = `\nCHARACTER CONTEXT:\n${characterContext}\n`;
        }

        // Build voice descriptions with their memories
        const voiceDescriptions = selectedVoices.map(voice => {
            let memoryNote = '';
            if (voiceMemories[voice.id]) {
                memoryNote = `\n   MEMORY: "${voiceMemories[voice.id]}"`;
            }
            return `${voice.signature} (${voice.name}): ${voice.personality}${memoryNote}`;
        }).join('\n\n');

        const systemPrompt = `You generate inner voices for a character in a narrative, inspired by Slay the Princess's voice system.

THE VOICES SPEAKING THIS MOMENT:
${voiceDescriptions}

RULES:
1. ${povInstruction}
2. Voices REACT to each other - they argue, agree, interrupt, and build on each other's points
3. Format EXACTLY as: VOICE_SIGNATURE - dialogue (e.g., "NARRATOR - ", "HERO - ")
4. Keep each line 1-3 sentences. Voices may speak multiple times.
5. The Narrator frames reality objectively; other voices react with their personalities
6. Voices remember their origins and biases - let that color their commentary
7. Create natural conversational flow - interruptions, agreements, arguments
8. Voices can directly address or reference each other
9. Total response: 4-10 voice lines depending on dramatic weight
${contextSection}

Output ONLY the voice dialogue. No meta-text, no explanations.`;

        const userPrompt = `Current scene: "${context.message.substring(0, 1000)}"

Generate the inner chorus reacting to this moment. Let the voices interact naturally.`;

        return { system: systemPrompt, user: userPrompt };
    }

    function parseChorusResponse(response, selectedVoices) {
        const lines = response.trim().split('\n').filter(line => line.trim());
        const results = [];

        // Build lookup map
        const voiceMap = {};
        selectedVoices.forEach(v => {
            voiceMap[v.signature.toUpperCase()] = v;
            voiceMap[v.name.toUpperCase()] = v;
            voiceMap[v.name.toUpperCase().replace('THE ', '')] = v;
        });

        for (const line of lines) {
            const match = line.match(/^([A-Z][A-Z\s]+)\s*[-:–—]\s*(.+)$/i);
            if (match) {
                const voiceKey = match[1].trim().toUpperCase();
                const content = match[2].trim();
                
                const voice = voiceMap[voiceKey];
                if (voice) {
                    results.push({
                        voiceId: voice.id,
                        name: voice.name,
                        signature: voice.signature,
                        color: voice.color,
                        content: content,
                        timestamp: Date.now()
                    });
                }
            }
        }

        if (results.length === 0 && response.trim()) {
            // Fallback - use first voice
            const v = selectedVoices[0];
            results.push({
                voiceId: v.id,
                name: v.name,
                signature: v.signature,
                color: v.color,
                content: response.trim().substring(0, 200),
                timestamp: Date.now()
            });
        }

        return results;
    }

    async function callAPI(systemPrompt, userPrompt) {
        let { apiEndpoint, apiKey, model, maxTokens, temperature } = extensionSettings;

        if (!apiEndpoint || !apiKey) {
            throw new Error('API not configured');
        }

        if (!apiEndpoint.includes('/chat/completions') && !apiEndpoint.includes('/completions')) {
            apiEndpoint = apiEndpoint.replace(/\/+$/, '');
            apiEndpoint = `${apiEndpoint}/chat/completions`;
        }

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model || 'glm-4-plus',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                max_tokens: maxTokens || 600,
                temperature: temperature || 0.9
            })
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error');
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content 
            || data.choices?.[0]?.text 
            || data.content?.[0]?.text
            || '';
    }

    async function generateVoices(context) {
        const selectedVoices = selectSpeakingVoices(context);
        if (selectedVoices.length === 0) return [];

        log('Selected voices:', selectedVoices.map(v => v.name));

        const prompt = buildChorusPrompt(selectedVoices, context);
        
        try {
            const response = await callAPI(prompt.system, prompt.user);
            const voices = parseChorusResponse(response, selectedVoices);
            
            // Store in history
            voiceHistory.push({
                timestamp: Date.now(),
                context: context.message.substring(0, 200),
                voices: voices.map(v => ({ name: v.name, content: v.content }))
            });
            
            return voices;
        } catch (error) {
            console.error('[Inner Chorus] Generation failed:', error);
            throw error;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // VOICE CREATOR
    // ═══════════════════════════════════════════════════════════════

    async function generateVoiceFromPrompt(prompt) {
        const systemPrompt = `You are a voice designer for a narrative system inspired by Slay the Princess. 
Given a description, create a complete voice profile.

Output ONLY valid JSON in this exact format:
{
    "name": "The [Name]",
    "signature": "[ALLCAPS]",
    "color": "#hexcolor",
    "description": "One-line poetic description",
    "personality": "2-4 sentences describing how this voice speaks, what it believes, what it wants. Written as instructions to the voice itself: 'You are THE X - ...'",
    "spawnType": "event|death|choice",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
    "spawnMemory": "1-2 sentences the voice 'remembers' about why it exists, written in first person"
}

Guidelines:
- Names should be "The [Concept]" format (The Hollow, The Betrayed, The Ravenous)
- Signature is the name in ALLCAPS without "The" (HOLLOW, BETRAYED, RAVENOUS)
- Colors should be evocative (deep red for anger, sickly green for envy, etc.)
- Personality should give the voice a distinct way of speaking and thinking
- Keywords should be words that might appear in narrative when this voice should awaken
- Spawn memory should be visceral and personal`;

        const userPrompt = `Create a voice based on this concept: "${prompt}"`;

        try {
            const response = await callAPI(systemPrompt, userPrompt);
            
            // Try to extract JSON from response
            let jsonStr = response;
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                jsonStr = jsonMatch[0];
            }
            
            const voiceData = JSON.parse(jsonStr);
            return voiceData;
        } catch (error) {
            console.error('[Inner Chorus] Voice generation failed:', error);
            throw new Error('Failed to generate voice. Check API settings.');
        }
    }

    function populateEditorFromGenerated(voiceData) {
        document.getElementById('ic-edit-name').value = voiceData.name || '';
        document.getElementById('ic-edit-signature').value = voiceData.signature || '';
        document.getElementById('ic-edit-color').value = voiceData.color || '#9932CC';
        document.getElementById('ic-edit-desc').value = voiceData.description || '';
        document.getElementById('ic-edit-personality').value = voiceData.personality || '';
        document.getElementById('ic-edit-always').value = 'false';
        document.getElementById('ic-edit-spawn-type').value = voiceData.spawnType || 'event';
        document.getElementById('ic-edit-keywords').value = (voiceData.keywords || []).join(', ');
        document.getElementById('ic-edit-memory').value = voiceData.spawnMemory || '';
        
        // Show spawn section
        document.getElementById('ic-spawn-section').style.display = 'block';
    }

    function getEditorVoiceData() {
        const name = document.getElementById('ic-edit-name').value.trim();
        const signature = document.getElementById('ic-edit-signature').value.trim().toUpperCase() || name.replace(/^The\s+/i, '').toUpperCase();
        const color = document.getElementById('ic-edit-color').value;
        const description = document.getElementById('ic-edit-desc').value.trim();
        const personality = document.getElementById('ic-edit-personality').value.trim();
        const alwaysPresent = document.getElementById('ic-edit-always').value === 'true';
        const spawnType = document.getElementById('ic-edit-spawn-type').value;
        const keywordsRaw = document.getElementById('ic-edit-keywords').value;
        const keywords = keywordsRaw.split(',').map(k => k.trim()).filter(k => k);
        const spawnMemory = document.getElementById('ic-edit-memory').value.trim();

        // Generate a safe ID
        const id = name.toLowerCase().replace(/^the\s+/, '').replace(/[^a-z0-9]+/g, '_');

        return {
            id,
            name,
            signature,
            color,
            description,
            personality,
            alwaysPresent,
            cannotBeDisabled: false,
            spawnCondition: alwaysPresent ? null : {
                type: spawnType,
                keywords,
                description: description
            },
            spawnMemory: alwaysPresent ? null : spawnMemory
        };
    }

    function validateVoiceData(voice) {
        const errors = [];
        if (!voice.name) errors.push('Name is required');
        if (!voice.personality) errors.push('Personality is required');
        if (!voice.alwaysPresent && (!voice.spawnCondition?.keywords?.length)) {
            errors.push('Spawn keywords are required for non-permanent voices');
        }
        return errors;
    }

    function saveVoiceToSet(voice) {
        const set = getCurrentVoiceSet();
        
        // Check for duplicate ID
        if (set.voices[voice.id]) {
            // Generate unique ID
            let counter = 2;
            let newId = voice.id;
            while (set.voices[newId]) {
                newId = `${voice.id}_${counter}`;
                counter++;
            }
            voice.id = newId;
        }

        set.voices[voice.id] = voice;
        saveState();
        return voice.id;
    }

    function previewVoice(voice) {
        const previewSection = document.getElementById('ic-preview-section');
        const previewContent = document.getElementById('ic-voice-preview');
        
        if (!previewSection || !previewContent) return;

        const spawnInfo = voice.alwaysPresent 
            ? '<span class="ic-badge">Always Present</span>'
            : `<div class="ic-preview-spawn">
                <strong>Spawns from:</strong> ${voice.spawnCondition?.type || 'event'}<br>
                <strong>Keywords:</strong> ${voice.spawnCondition?.keywords?.join(', ') || 'none'}<br>
                <strong>Memory:</strong> <em>"${voice.spawnMemory || '...'}"</em>
               </div>`;

        previewContent.innerHTML = `
            <div class="ic-voice-card ic-voice-awake" style="--voice-color: ${voice.color}">
                <div class="ic-voice-header">
                    <span class="ic-voice-name" style="color: ${voice.color}">${voice.name}</span>
                    <span class="ic-badge">${voice.signature}</span>
                </div>
                <div class="ic-voice-desc">${voice.description || 'No description'}</div>
                <div class="ic-voice-personality"><em>${voice.personality?.substring(0, 150) || 'No personality defined'}...</em></div>
                ${spawnInfo}
            </div>
        `;
        
        previewSection.style.display = 'block';
    }

    function clearEditor() {
        document.getElementById('ic-edit-name').value = '';
        document.getElementById('ic-edit-signature').value = '';
        document.getElementById('ic-edit-color').value = '#9932CC';
        document.getElementById('ic-edit-desc').value = '';
        document.getElementById('ic-edit-personality').value = '';
        document.getElementById('ic-edit-always').value = 'false';
        document.getElementById('ic-edit-spawn-type').value = 'event';
        document.getElementById('ic-edit-keywords').value = '';
        document.getElementById('ic-edit-memory').value = '';
        document.getElementById('ic-gen-prompt').value = '';
        document.getElementById('ic-preview-section').style.display = 'none';
        document.getElementById('ic-spawn-section').style.display = 'block';
    }

    // ═══════════════════════════════════════════════════════════════
    // TOAST NOTIFICATIONS
    // ═══════════════════════════════════════════════════════════════

    function createToastContainer() {
        let container = document.getElementById('ic-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'ic-toast-container';
            container.className = 'ic-toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    function showToast(message, type = 'info', duration = 3000) {
        const container = createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `ic-toast ic-toast-${type}`;
        
        const icon = type === 'loading' ? 'fa-spinner fa-spin' :
                     type === 'success' ? 'fa-check' :
                     type === 'error' ? 'fa-exclamation-triangle' :
                     type === 'voice' ? 'fa-ghost' : 'fa-comments';
        
        toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
        container.appendChild(toast);
        
        requestAnimationFrame(() => toast.classList.add('ic-toast-show'));
        
        if (type !== 'loading') {
            setTimeout(() => {
                toast.classList.remove('ic-toast-show');
                toast.classList.add('ic-toast-hide');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }
        
        return toast;
    }

    function hideToast(toast) {
        if (toast?.parentNode) {
            toast.classList.remove('ic-toast-show');
            toast.classList.add('ic-toast-hide');
            setTimeout(() => toast.remove(), 300);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // UI RENDERING
    // ═══════════════════════════════════════════════════════════════

    function createMainUI() {
        // Create FAB
        const fab = document.createElement('div');
        fab.id = 'ic-fab';
        fab.className = 'ic-fab';
        fab.innerHTML = '<i class="fa-solid fa-comments"></i>';
        fab.title = 'Inner Chorus';
        document.body.appendChild(fab);

        // Create Panel
        const panel = document.createElement('div');
        panel.id = 'ic-panel';
        panel.className = 'ic-panel';
        panel.innerHTML = `
            <div class="ic-panel-header">
                <div class="ic-panel-title">
                    <i class="fa-solid fa-comments"></i>
                    <span>Inner Chorus</span>
                </div>
                <button class="ic-btn ic-btn-close" title="Close">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
            <div class="ic-tabs">
                <button class="ic-tab ic-tab-active" data-tab="voices">
                    <i class="fa-solid fa-users"></i>
                    <span>Voices</span>
                </button>
                <button class="ic-tab" data-tab="history">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <span>History</span>
                </button>
                <button class="ic-tab" data-tab="create">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    <span>Create</span>
                </button>
                <button class="ic-tab" data-tab="profiles">
                    <i class="fa-solid fa-user-circle"></i>
                    <span>Profiles</span>
                </button>
                <button class="ic-tab" data-tab="settings">
                    <i class="fa-solid fa-gear"></i>
                    <span>Settings</span>
                </button>
            </div>
            <div class="ic-panel-content">
                <!-- VOICES TAB -->
                <div class="ic-tab-content ic-tab-content-active" data-tab-content="voices">
                    <div class="ic-section">
                        <div class="ic-section-header">
                            <span>Active Voices</span>
                            <span class="ic-voice-count" id="ic-voice-count">0 awake</span>
                        </div>
                        <div class="ic-voices-list" id="ic-voices-list"></div>
                    </div>
                    <div class="ic-section">
                        <div class="ic-section-header">
                            <span>Latest Chorus</span>
                            <button class="ic-btn ic-btn-sm" id="ic-clear-chorus" title="Clear">
                                <i class="fa-solid fa-eraser"></i>
                            </button>
                        </div>
                        <div class="ic-chorus-output" id="ic-chorus-output">
                            <div class="ic-empty-state">
                                <i class="fa-solid fa-comment-slash"></i>
                                <span>The voices are quiet...</span>
                            </div>
                        </div>
                    </div>
                    <button class="ic-btn ic-btn-primary ic-btn-trigger" id="ic-manual-trigger">
                        <i class="fa-solid fa-bolt"></i>
                        <span>Summon the Chorus</span>
                    </button>
                </div>

                <!-- HISTORY TAB -->
                <div class="ic-tab-content" data-tab-content="history">
                    <div class="ic-section">
                        <div class="ic-section-header">
                            <span>Voice History</span>
                        </div>
                        <div class="ic-history-list" id="ic-history-list">
                            <div class="ic-empty-state">
                                <i class="fa-solid fa-clock"></i>
                                <span>No history yet...</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CREATE TAB -->
                <div class="ic-tab-content" data-tab-content="create">
                    <!-- Generator Section -->
                    <div class="ic-section ic-generator-section">
                        <div class="ic-section-header">
                            <span><i class="fa-solid fa-wand-magic-sparkles"></i> Voice Generator</span>
                        </div>
                        <div class="ic-form-group">
                            <label>Describe Your Voice</label>
                            <textarea id="ic-gen-prompt" rows="3" placeholder="A paranoid voice born from being betrayed by someone trusted, always seeing hidden agendas..."></textarea>
                            <small class="ic-hint">Describe the concept, origin, or personality. The AI will flesh it out.</small>
                        </div>
                        <button class="ic-btn ic-btn-primary" id="ic-generate-voice">
                            <i class="fa-solid fa-sparkles"></i>
                            <span>Generate Voice</span>
                        </button>
                    </div>

                    <div class="ic-divider">
                        <span>or edit manually</span>
                    </div>

                    <!-- Manual Editor Section -->
                    <div class="ic-section ic-editor-section">
                        <div class="ic-section-header">
                            <span><i class="fa-solid fa-pen"></i> Voice Editor</span>
                            <button class="ic-btn ic-btn-sm" id="ic-clear-editor" title="Clear form">
                                <i class="fa-solid fa-eraser"></i>
                            </button>
                        </div>
                        
                        <div class="ic-form-row">
                            <div class="ic-form-group" style="flex: 2">
                                <label>Voice Name</label>
                                <input type="text" id="ic-edit-name" placeholder="The Betrayed" />
                            </div>
                            <div class="ic-form-group" style="flex: 1">
                                <label>Signature</label>
                                <input type="text" id="ic-edit-signature" placeholder="BETRAYED" />
                            </div>
                        </div>

                        <div class="ic-form-row">
                            <div class="ic-form-group" style="flex: 1">
                                <label>Color</label>
                                <input type="color" id="ic-edit-color" value="#9932CC" />
                            </div>
                            <div class="ic-form-group" style="flex: 2">
                                <label>Always Present?</label>
                                <select id="ic-edit-always">
                                    <option value="false">No - Spawns from events</option>
                                    <option value="true">Yes - Always active</option>
                                </select>
                            </div>
                        </div>

                        <div class="ic-form-group">
                            <label>Short Description</label>
                            <input type="text" id="ic-edit-desc" placeholder="Trust is a wound that never heals." />
                        </div>

                        <div class="ic-form-group">
                            <label>Personality <small>(How the voice speaks and thinks)</small></label>
                            <textarea id="ic-edit-personality" rows="4" placeholder="You are THE BETRAYED - born from the knife in the back you never saw coming..."></textarea>
                        </div>

                        <div class="ic-spawn-section" id="ic-spawn-section">
                            <div class="ic-form-group">
                                <label>Spawn Type</label>
                                <select id="ic-edit-spawn-type">
                                    <option value="event">Event (something happens)</option>
                                    <option value="death">Death (character dies)</option>
                                    <option value="choice">Choice (character decides)</option>
                                </select>
                            </div>

                            <div class="ic-form-group">
                                <label>Spawn Keywords <small>(comma-separated)</small></label>
                                <input type="text" id="ic-edit-keywords" placeholder="betrayed, stabbed in back, trusted, lied to" />
                            </div>

                            <div class="ic-form-group">
                                <label>Spawn Memory <small>(What the voice remembers)</small></label>
                                <textarea id="ic-edit-memory" rows="2" placeholder="I remember the smile on their face, right before they twisted the knife..."></textarea>
                            </div>
                        </div>

                        <div class="ic-form-actions">
                            <button class="ic-btn" id="ic-preview-voice">
                                <i class="fa-solid fa-eye"></i>
                                <span>Preview</span>
                            </button>
                            <button class="ic-btn ic-btn-primary" id="ic-save-voice">
                                <i class="fa-solid fa-save"></i>
                                <span>Save Voice</span>
                            </button>
                        </div>
                    </div>

                    <!-- Preview Section -->
                    <div class="ic-section ic-preview-section" id="ic-preview-section" style="display: none;">
                        <div class="ic-section-header">
                            <span><i class="fa-solid fa-eye"></i> Preview</span>
                        </div>
                        <div class="ic-voice-preview" id="ic-voice-preview"></div>
                    </div>
                </div>

                <!-- PROFILES TAB -->
                <div class="ic-tab-content" data-tab-content="profiles">
                    <div class="ic-section">
                        <div class="ic-section-header">
                            <span><i class="fa-solid fa-save"></i> Save Current State</span>
                        </div>
                        <p class="ic-hint" style="margin-bottom: 10px;">
                            Save your current voices, memories, and character context as a profile.
                        </p>
                        <div class="ic-form-row">
                            <div class="ic-form-group" style="flex: 2">
                                <input type="text" id="ic-new-profile-name" placeholder="Profile name (e.g., Somnolence)" />
                            </div>
                            <button class="ic-btn ic-btn-primary" id="ic-create-profile">
                                <i class="fa-solid fa-plus"></i>
                                <span>Save</span>
                            </button>
                        </div>
                    </div>

                    <div class="ic-section">
                        <div class="ic-section-header">
                            <span><i class="fa-solid fa-folder-open"></i> Saved Profiles</span>
                            <span class="ic-profile-count" id="ic-profile-count">0 profiles</span>
                        </div>
                        <div class="ic-profiles-list" id="ic-profiles-list">
                            <div class="ic-empty-state">
                                <i class="fa-solid fa-user-slash"></i>
                                <span>No saved profiles yet</span>
                            </div>
                        </div>
                    </div>

                    <div class="ic-section ic-active-profile-section" id="ic-active-profile-section" style="display: none;">
                        <div class="ic-section-header">
                            <span><i class="fa-solid fa-user-check"></i> Active Profile</span>
                        </div>
                        <div class="ic-active-profile" id="ic-active-profile"></div>
                        <button class="ic-btn ic-btn-sm" id="ic-update-profile" style="margin-top: 8px;">
                            <i class="fa-solid fa-save"></i>
                            <span>Update Profile</span>
                        </button>
                    </div>
                </div>

                <!-- SETTINGS TAB -->
                <div class="ic-tab-content" data-tab-content="settings">
                    <div class="ic-section">
                        <div class="ic-section-header"><span>API Configuration</span></div>
                        <div class="ic-form-group">
                            <label>API Endpoint</label>
                            <input type="text" id="ic-api-endpoint" placeholder="https://api.example.com/v1/" />
                        </div>
                        <div class="ic-form-group">
                            <label>API Key</label>
                            <input type="password" id="ic-api-key" placeholder="sk-..." />
                        </div>
                        <div class="ic-form-group">
                            <label>Model</label>
                            <input type="text" id="ic-model" placeholder="glm-4-plus" />
                        </div>
                        <div class="ic-form-row">
                            <div class="ic-form-group">
                                <label>Temperature</label>
                                <input type="number" id="ic-temperature" min="0" max="2" step="0.1" value="0.9" />
                            </div>
                            <div class="ic-form-group">
                                <label>Max Tokens</label>
                                <input type="number" id="ic-max-tokens" min="100" max="2000" value="600" />
                            </div>
                        </div>
                    </div>
                    <div class="ic-section">
                        <div class="ic-section-header"><span>Behavior</span></div>
                        <div class="ic-form-row">
                            <div class="ic-form-group">
                                <label>Min Voices</label>
                                <input type="number" id="ic-min-voices" min="1" max="10" value="2" />
                            </div>
                            <div class="ic-form-group">
                                <label>Max Voices</label>
                                <input type="number" id="ic-max-voices" min="1" max="10" value="5" />
                            </div>
                        </div>
                        <div class="ic-form-group">
                            <label class="ic-checkbox">
                                <input type="checkbox" id="ic-auto-trigger" checked />
                                <span>Auto-trigger on AI messages</span>
                            </label>
                        </div>
                        <div class="ic-form-group">
                            <label>Trigger Delay (ms)</label>
                            <input type="number" id="ic-trigger-delay" min="500" max="5000" step="100" value="1500" />
                            <small class="ic-hint">Wait time after message received (for streaming to complete)</small>
                        </div>
                        <div class="ic-form-group">
                            <label class="ic-checkbox">
                                <input type="checkbox" id="ic-auto-spawn" checked />
                                <span>Auto-spawn voices from events</span>
                            </label>
                            <small class="ic-hint">New voices awaken based on deaths, trauma, and choices</small>
                        </div>
                    </div>
                    <div class="ic-section">
                        <div class="ic-section-header"><span>Character Context</span></div>
                        <div class="ic-form-group">
                            <label>POV Style</label>
                            <select id="ic-pov-style">
                                <option value="second">Second Person (you/your)</option>
                                <option value="third">Third Person (name/they)</option>
                                <option value="first">First Person (I/me)</option>
                            </select>
                        </div>
                        <div class="ic-form-group">
                            <label>Character Name</label>
                            <input type="text" id="ic-character-name" placeholder="For third-person references" />
                        </div>
                        <div class="ic-form-group">
                            <label>Character Context</label>
                            <textarea id="ic-character-context" rows="3" placeholder="Who is this character? What are they like?"></textarea>
                        </div>
                    </div>
                    <button class="ic-btn ic-btn-primary" id="ic-save-settings">
                        <i class="fa-solid fa-save"></i>
                        <span>Save Settings</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(panel);

        setupEventListeners();
        populateSettings();
        renderVoicesList();
        renderProfilesList();
        applyFabPosition();
        makeFabDraggable();
    }

    function renderVoicesList() {
        const container = document.getElementById('ic-voices-list');
        const countEl = document.getElementById('ic-voice-count');
        if (!container) return;

        const set = getCurrentVoiceSet();
        const voices = Object.values(set.voices);
        
        countEl.textContent = `${activeVoices.size} awake`;

        container.innerHTML = voices.map(voice => {
            const isAwake = activeVoices.has(voice.id);
            const memory = voiceMemories[voice.id];
            
            return `
                <div class="ic-voice-card ${isAwake ? 'ic-voice-awake' : 'ic-voice-dormant'}" 
                     data-voice-id="${voice.id}"
                     style="--voice-color: ${voice.color}">
                    <div class="ic-voice-header">
                        <span class="ic-voice-name" style="color: ${voice.color}">${voice.name}</span>
                        <div class="ic-voice-status">
                            ${voice.alwaysPresent ? '<span class="ic-badge">Always</span>' : ''}
                            <span class="ic-status-dot ${isAwake ? 'ic-awake' : 'ic-dormant'}"></span>
                        </div>
                    </div>
                    <div class="ic-voice-desc">${voice.description}</div>
                    ${memory ? `<div class="ic-voice-memory">"${memory}"</div>` : ''}
                    ${!voice.cannotBeDisabled ? `
                        <button class="ic-btn ic-btn-sm ic-btn-toggle" data-action="${isAwake ? 'silence' : 'awaken'}">
                            <i class="fa-solid ${isAwake ? 'fa-volume-xmark' : 'fa-volume-high'}"></i>
                            <span>${isAwake ? 'Silence' : 'Awaken'}</span>
                        </button>
                    ` : ''}
                </div>
            `;
        }).join('');

        // Add click handlers for toggle buttons
        container.querySelectorAll('.ic-btn-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.ic-voice-card');
                const voiceId = card.dataset.voiceId;
                const action = btn.dataset.action;
                
                if (action === 'awaken') {
                    awakenVoice(voiceId);
                } else {
                    silenceVoice(voiceId);
                }
            });
        });
    }

    function renderProfilesList() {
        const container = document.getElementById('ic-profiles-list');
        const countEl = document.getElementById('ic-profile-count');
        const activeSection = document.getElementById('ic-active-profile-section');
        const activeProfileEl = document.getElementById('ic-active-profile');
        
        if (!container) return;

        const profiles = getProfileList();
        countEl.textContent = `${profiles.length} profile${profiles.length !== 1 ? 's' : ''}`;

        if (profiles.length === 0) {
            container.innerHTML = `
                <div class="ic-empty-state">
                    <i class="fa-solid fa-user-slash"></i>
                    <span>No saved profiles yet</span>
                </div>
            `;
            activeSection.style.display = 'none';
            return;
        }

        container.innerHTML = profiles.map(profile => {
            const isActive = extensionSettings.activeProfileId === profile.id;
            const voiceCount = profile.activeVoices?.length || 0;
            const date = new Date(profile.updatedAt).toLocaleDateString();
            
            return `
                <div class="ic-profile-card ${isActive ? 'ic-profile-active' : ''}" data-profile-id="${profile.id}">
                    <div class="ic-profile-header">
                        <span class="ic-profile-name">${profile.name}</span>
                        ${isActive ? '<span class="ic-badge ic-badge-active">Active</span>' : ''}
                    </div>
                    <div class="ic-profile-meta">
                        <span>${voiceCount} voices</span>
                        <span>•</span>
                        <span>${date}</span>
                    </div>
                    <div class="ic-profile-actions">
                        ${!isActive ? `
                            <button class="ic-btn ic-btn-sm ic-btn-load" data-action="load">
                                <i class="fa-solid fa-folder-open"></i>
                                <span>Load</span>
                            </button>
                        ` : ''}
                        <button class="ic-btn ic-btn-sm ic-btn-delete" data-action="delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Add click handlers
        container.querySelectorAll('.ic-btn-load').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.ic-profile-card');
                const profileId = card.dataset.profileId;
                const profile = personaProfiles[profileId];
                
                if (loadProfile(profileId)) {
                    showToast(`Loaded profile: ${profile.name}`, 'success', 2000);
                    renderProfilesList();
                    renderVoicesList();
                    populateSettings();
                }
            });
        });

        container.querySelectorAll('.ic-btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.ic-profile-card');
                const profileId = card.dataset.profileId;
                const profile = personaProfiles[profileId];
                
                if (confirm(`Delete profile "${profile.name}"?`)) {
                    deleteProfile(profileId);
                    showToast('Profile deleted', 'info', 2000);
                    renderProfilesList();
                }
            });
        });

        // Show active profile section if one is active
        const activeProfile = personaProfiles[extensionSettings.activeProfileId];
        if (activeProfile && activeProfileEl) {
            activeSection.style.display = 'block';
            activeProfileEl.innerHTML = `
                <strong>${activeProfile.name}</strong>
                <div class="ic-profile-meta" style="margin-top: 4px;">
                    ${activeProfile.activeVoices?.length || 0} voices • Updated ${new Date(activeProfile.updatedAt).toLocaleDateString()}
                </div>
            `;
        } else {
            activeSection.style.display = 'none';
        }
    }

    function displayChorus(voices) {
        const container = document.getElementById('ic-chorus-output');
        if (!container || voices.length === 0) return;

        const chorusHtml = voices.map(v => `
            <div class="ic-chorus-line">
                <span class="ic-chorus-name" style="color: ${v.color}">${v.signature}</span>
                <span class="ic-chorus-content"> - ${v.content}</span>
            </div>
        `).join('');

        container.innerHTML = `<div class="ic-chorus-batch">${chorusHtml}</div>`;
    }

    function injectChorusIntoChat(voices, messageElement) {
        if (!voices?.length || !messageElement) return;

        const existing = messageElement.querySelector('.ic-chat-chorus');
        if (existing) existing.remove();

        const chorusContainer = document.createElement('div');
        chorusContainer.className = 'ic-chat-chorus';

        const chorusLines = voices.map(v => `
            <div class="ic-chorus-line">
                <span class="ic-chorus-name" style="color: ${v.color}">${v.signature}</span>
                <span class="ic-chorus-content"> - ${v.content}</span>
            </div>
        `).join('');

        chorusContainer.innerHTML = `
            <div class="ic-chorus-header">
                <i class="fa-solid fa-comments"></i>
                <span>Inner Chorus</span>
            </div>
            <div class="ic-chorus-content-wrap">${chorusLines}</div>
        `;

        const mesText = messageElement.querySelector('.mes_text');
        if (mesText) {
            mesText.parentNode.insertBefore(chorusContainer, mesText.nextSibling);
        } else {
            messageElement.appendChild(chorusContainer);
        }
    }

    function populateSettings() {
        const s = extensionSettings;
        
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val ?? '';
        };
        const setChecked = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.checked = val !== false;
        };

        setVal('ic-api-endpoint', s.apiEndpoint);
        setVal('ic-api-key', s.apiKey);
        setVal('ic-model', s.model);
        setVal('ic-temperature', s.temperature);
        setVal('ic-max-tokens', s.maxTokens);
        setVal('ic-min-voices', s.minVoices);
        setVal('ic-max-voices', s.maxVoices);
        setChecked('ic-auto-trigger', s.autoTrigger);
        setVal('ic-trigger-delay', s.triggerDelay);
        setChecked('ic-auto-spawn', s.autoSpawn);
        setVal('ic-pov-style', s.povStyle);
        setVal('ic-character-name', s.characterName);
        setVal('ic-character-context', s.characterContext);
    }

    function saveSettings() {
        const getVal = (id) => document.getElementById(id)?.value || '';
        const getNum = (id, def) => parseFloat(document.getElementById(id)?.value) || def;
        const getChecked = (id) => document.getElementById(id)?.checked !== false;

        extensionSettings.apiEndpoint = getVal('ic-api-endpoint');
        extensionSettings.apiKey = getVal('ic-api-key');
        extensionSettings.model = getVal('ic-model');
        extensionSettings.temperature = getNum('ic-temperature', 0.9);
        extensionSettings.maxTokens = getNum('ic-max-tokens', 600);
        extensionSettings.minVoices = getNum('ic-min-voices', 2);
        extensionSettings.maxVoices = getNum('ic-max-voices', 5);
        extensionSettings.autoTrigger = getChecked('ic-auto-trigger');
        extensionSettings.triggerDelay = getNum('ic-trigger-delay', 1500);
        extensionSettings.autoSpawn = getChecked('ic-auto-spawn');
        extensionSettings.povStyle = getVal('ic-pov-style');
        extensionSettings.characterName = getVal('ic-character-name');
        extensionSettings.characterContext = getVal('ic-character-context');

        saveState();
        showToast('Settings saved!', 'success', 2000);
    }

    // ═══════════════════════════════════════════════════════════════
    // EVENT HANDLERS
    // ═══════════════════════════════════════════════════════════════

    // Wrapper for auto-triggered messages - adds delay to let streaming complete
    function onMessageReceivedDelayed(messageData) {
        // Clear any pending trigger
        if (triggerTimeout) {
            clearTimeout(triggerTimeout);
            triggerTimeout = null;
        }

        // Don't even queue if auto-trigger is disabled
        if (!extensionSettings.autoTrigger) return;

        const delay = extensionSettings.triggerDelay || 1500;
        log(`Auto-trigger queued (${delay}ms delay)...`);

        triggerTimeout = setTimeout(() => {
            triggerTimeout = null;
            // Re-fetch the latest message content after delay
            const context = getSTContext();
            const chat = context?.chat || [];
            const lastMsg = [...chat].reverse().find(m => !m.is_user);
            if (lastMsg?.mes && lastMsg.mes.length >= 10) {
                onMessageReceived({ message: lastMsg.mes }, false);
            }
        }, delay);
    }

    async function onMessageReceived(messageData, isManual = false) {
        if (!extensionSettings.enabled) return;
        if (!isManual && !extensionSettings.autoTrigger) return;
        if (isGenerating) return;

        // Handle different event formats from SillyTavern
        let messageContent = '';
        
        if (typeof messageData === 'string') {
            // Sometimes the event passes just a message ID
            const context = getSTContext();
            const chat = context?.chat || [];
            const lastMsg = [...chat].reverse().find(m => !m.is_user);
            messageContent = lastMsg?.mes || '';
        } else if (messageData?.message) {
            messageContent = messageData.message;
        } else if (messageData?.mes) {
            messageContent = messageData.mes;
        } else {
            // Fallback: get latest AI message from chat
            const context = getSTContext();
            const chat = context?.chat || [];
            const lastMsg = [...chat].reverse().find(m => !m.is_user);
            messageContent = lastMsg?.mes || '';
        }

        if (!messageContent || messageContent.length < 10) return;
        
        log('Processing message...', isManual ? '(manual)' : '(auto)');

        isGenerating = true;
        const btn = document.getElementById('ic-manual-trigger');
        const loadingToast = showToast(
            isManual ? 'Summoning the chorus...' : 'The voices stir...',
            'loading'
        );

        if (btn) {
            btn.classList.add('ic-loading');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Listening...</span>';
            btn.disabled = true;
        }

        try {
            // Check for spawn events
            if (extensionSettings.autoSpawn) {
                const spawned = detectSpawnEvents(messageContent);
                if (spawned.length > 0) {
                    processSpawnEvents(spawned, messageContent);
                }
            }

            const context = { message: messageContent };
            const voices = await generateVoices(context);

            displayChorus(voices);
            
            const lastMessage = document.querySelectorAll('#chat .mes:not([is_user="true"])');
            if (lastMessage.length > 0) {
                injectChorusIntoChat(voices, lastMessage[lastMessage.length - 1]);
            }

            hideToast(loadingToast);
            showToast(`${voices.length} voice${voices.length !== 1 ? 's' : ''} spoke`, 'success', 2000);

        } catch (error) {
            console.error('[Inner Chorus] Error:', error);
            hideToast(loadingToast);
            showToast('The voices are silent...', 'error', 3000);
        } finally {
            isGenerating = false;
            if (btn) {
                btn.classList.remove('ic-loading');
                btn.innerHTML = '<i class="fa-solid fa-bolt"></i><span>Summon the Chorus</span>';
                btn.disabled = false;
            }
        }
    }

    async function onManualTrigger() {
        if (isGenerating) return;

        const context = getSTContext();
        if (!context) return;

        const chat = context.chat || [];
        const lastAIMessage = [...chat].reverse().find(m => !m.is_user);

        if (!lastAIMessage) {
            showToast('No message to react to...', 'info', 2000);
            return;
        }

        await onMessageReceived({ message: lastAIMessage.mes }, true);
    }

    function setupEventListeners() {
        // FAB click
        document.getElementById('ic-fab')?.addEventListener('click', () => {
            const panel = document.getElementById('ic-panel');
            panel?.classList.toggle('ic-panel-open');
        });

        // Close button
        document.querySelector('.ic-btn-close')?.addEventListener('click', () => {
            document.getElementById('ic-panel')?.classList.remove('ic-panel-open');
        });

        // Tab switching
        document.querySelectorAll('.ic-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.ic-tab').forEach(t => t.classList.remove('ic-tab-active'));
                document.querySelectorAll('.ic-tab-content').forEach(c => c.classList.remove('ic-tab-content-active'));
                
                tab.classList.add('ic-tab-active');
                document.querySelector(`[data-tab-content="${tab.dataset.tab}"]`)?.classList.add('ic-tab-content-active');
            });
        });

        // Manual trigger
        document.getElementById('ic-manual-trigger')?.addEventListener('click', onManualTrigger);

        // Clear chorus
        document.getElementById('ic-clear-chorus')?.addEventListener('click', () => {
            const container = document.getElementById('ic-chorus-output');
            if (container) {
                container.innerHTML = '<div class="ic-empty-state"><i class="fa-solid fa-comment-slash"></i><span>The voices are quiet...</span></div>';
            }
        });

        // Save settings
        document.getElementById('ic-save-settings')?.addEventListener('click', saveSettings);

        // ═══ VOICE CREATOR EVENTS ═══
        
        // Generate voice from prompt
        document.getElementById('ic-generate-voice')?.addEventListener('click', async () => {
            const prompt = document.getElementById('ic-gen-prompt')?.value?.trim();
            if (!prompt) {
                showToast('Enter a description first!', 'error', 2000);
                return;
            }

            const btn = document.getElementById('ic-generate-voice');
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Generating...</span>';
            
            const loadingToast = showToast('Conjuring a new voice...', 'loading');

            try {
                const voiceData = await generateVoiceFromPrompt(prompt);
                populateEditorFromGenerated(voiceData);
                hideToast(loadingToast);
                showToast('Voice generated! Review and save below.', 'success', 3000);
            } catch (error) {
                hideToast(loadingToast);
                showToast(error.message || 'Generation failed', 'error', 3000);
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<i class="fa-solid fa-sparkles"></i><span>Generate Voice</span>';
            }
        });

        // Preview voice
        document.getElementById('ic-preview-voice')?.addEventListener('click', () => {
            const voice = getEditorVoiceData();
            const errors = validateVoiceData(voice);
            
            if (errors.length > 0) {
                showToast(errors[0], 'error', 3000);
                return;
            }
            
            previewVoice(voice);
        });

        // Save voice
        document.getElementById('ic-save-voice')?.addEventListener('click', () => {
            const voice = getEditorVoiceData();
            const errors = validateVoiceData(voice);
            
            if (errors.length > 0) {
                showToast(errors[0], 'error', 3000);
                return;
            }

            const savedId = saveVoiceToSet(voice);
            showToast(`${voice.name} saved to voice set!`, 'success', 3000);
            
            // Refresh the voices list
            renderVoicesList();
            
            // Clear the editor
            clearEditor();
        });

        // Clear editor
        document.getElementById('ic-clear-editor')?.addEventListener('click', clearEditor);

        // Toggle spawn section based on "always present" selection
        document.getElementById('ic-edit-always')?.addEventListener('change', (e) => {
            const spawnSection = document.getElementById('ic-spawn-section');
            if (spawnSection) {
                spawnSection.style.display = e.target.value === 'true' ? 'none' : 'block';
            }
        });

        // Auto-generate signature from name
        document.getElementById('ic-edit-name')?.addEventListener('blur', (e) => {
            const sigInput = document.getElementById('ic-edit-signature');
            if (sigInput && !sigInput.value.trim()) {
                const name = e.target.value.trim();
                sigInput.value = name.replace(/^The\s+/i, '').toUpperCase();
            }
        });
        
        // ═══ PROFILE EVENTS ═══
        
        // Create new profile
        document.getElementById('ic-create-profile')?.addEventListener('click', () => {
            const nameInput = document.getElementById('ic-new-profile-name');
            const name = nameInput?.value?.trim();
            
            if (!name) {
                showToast('Enter a profile name!', 'error', 2000);
                return;
            }

            const profile = createProfile(name);
            showToast(`Profile "${name}" created!`, 'success', 2000);
            nameInput.value = '';
            renderProfilesList();
        });

        // Update active profile
        document.getElementById('ic-update-profile')?.addEventListener('click', () => {
            const profileId = extensionSettings.activeProfileId;
            if (!profileId || !personaProfiles[profileId]) {
                showToast('No active profile to update', 'error', 2000);
                return;
            }

            saveCurrentToProfile(profileId);
            showToast('Profile updated!', 'success', 2000);
            renderProfilesList();
        });
        
        // Note: ST events are registered in init() with retry logic
    }

    function applyFabPosition() {
        const fab = document.getElementById('ic-fab');
        if (fab) {
            fab.style.top = `${extensionSettings.fabPositionTop}px`;
            fab.style.left = `${extensionSettings.fabPositionLeft}px`;
        }
    }

    function makeFabDraggable() {
        const fab = document.getElementById('ic-fab');
        if (!fab) return;

        let isDragging = false;
        let startX, startY, startLeft, startTop;

        fab.addEventListener('mousedown', startDrag);
        fab.addEventListener('touchstart', startDrag, { passive: false });

        function startDrag(e) {
            isDragging = true;
            const touch = e.touches?.[0] || e;
            startX = touch.clientX;
            startY = touch.clientY;
            startLeft = fab.offsetLeft;
            startTop = fab.offsetTop;
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        }

        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            const touch = e.touches?.[0] || e;
            const dx = touch.clientX - startX;
            const dy = touch.clientY - startY;
            
            fab.style.left = `${startLeft + dx}px`;
            fab.style.top = `${startTop + dy}px`;
        }

        function stopDrag() {
            if (!isDragging) return;
            isDragging = false;
            
            extensionSettings.fabPositionLeft = fab.offsetLeft;
            extensionSettings.fabPositionTop = fab.offsetTop;
            saveState();
            
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════

    function registerSTEvents() {
        const context = getSTContext();
        if (context?.eventSource) {
            const eventTypes = context.event_types || (typeof event_types !== 'undefined' ? event_types : null);
            if (eventTypes?.MESSAGE_RECEIVED) {
                // Use delayed wrapper for auto-triggers to let streaming complete
                context.eventSource.on(eventTypes.MESSAGE_RECEIVED, onMessageReceivedDelayed);
                log('✅ Registered MESSAGE_RECEIVED listener (with delay)');
                return true;
            }
        }
        return false;
    }

    function init() {
        log('Initializing...');
        loadState();
        createMainUI();
        
        // Try to register events immediately
        if (!registerSTEvents()) {
            // Retry after a delay if ST context isn't ready
            log('Waiting for SillyTavern context...');
            setTimeout(() => {
                if (!registerSTEvents()) {
                    log('Retrying event registration...');
                    setTimeout(() => {
                        if (!registerSTEvents()) {
                            log('⚠️ Could not register auto-trigger. Manual trigger still works.');
                        }
                    }, 2000);
                }
            }, 1000);
        }
        
        log('Ready!', { activeVoices: Array.from(activeVoices) });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
