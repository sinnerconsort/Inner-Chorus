# Inner Chorus 🎭

**Dynamic inner voices for SillyTavern** - inspired by *Slay the Princess* and *Disco Elysium*.

Your character's psyche becomes a chorus of voices that comment, argue, and evolve based on what happens in the story.

## ✨ Features

### 🎭 Voice System
- **Dynamic voices** that respond to story events
- **Narrator** provides poetic scene-setting
- **Personality voices** argue and debate about choices
- Voices can be **awakened/silenced** on demand
- Full **customization** of voice personalities

### 🔊 Voice Loudness
- **Per-voice volume slider** (0-10)
- Control how often each voice speaks
- Set to 0 to mute a voice without removing it
- Higher loudness = more likely to be selected

### 💔 Voice Relationships (Bonds Tab)
- **Dedicated Bonds tab** for relationship management
- **Tension** (⚡) - voices that argue and contradict
- **Alliance** (🤝) - voices that support and agree
- **AI-generated** with one click
- **Manual control** - add, remove, or cycle relationship types
- **Custom dynamics** - describe how voices interact

### 🧠 Generate from Persona
- Scan your **persona description** and **lorebook**
- AI creates a **custom voice set** tailored to your character
- Choose how many voices (3/5/7)
- Choose starting state (all dormant, narrator only, core voices, all active)

### 🔮 Context-Aware Spawning
- AI analyzes **who your character is** and **how they react**
- Same event → different characters → different voices
- Creates **brand new voices** tailored to specific story moments
- ⚠️ Uses additional API calls per message

### 📚 Voice Management
- **Remove** individual voices from your set
- **Voice Library** to add back removed voices
- **Clear All** to start with empty template
- **Reset** to restore defaults

### 👤 Persona Profiles
- Save your entire voice configuration per character
- Load profiles to restore voices, memories, and settings
- Update profiles as your character evolves

### 📤 Export / Import
- **Export All** - Download complete backup
- **Copy Current** - Share voice sets with others
- **Import** - Load from JSON files

## Installation

1. Download the latest release
2. Extract to `SillyTavern/data/default-user/extensions/inner-chorus/`
3. Enable in Extensions menu
4. Configure API settings (requires separate LLM endpoint)

## Tab Overview

| Tab | Purpose |
|-----|---------|
| **Voices** | View, awaken/silence, adjust loudness |
| **Bonds** | Manage voice relationships |
| **Create** | Generate from persona or create manually |
| **Profiles** | Save/load character configurations |
| **Settings** | API, triggers, character context |

## Voice Badges

| Badge | Meaning |
|-------|---------|
| **Always** | Voice is always present |
| **Core** | Central personality voice |
| **Persona** | Generated from persona |
| **Story** | Spawned from story events |

## Workflow Tips

1. **Start Fresh**: Use "Generate from Persona" for a custom voice set
2. **Add Relationships**: Go to Bonds tab, click ✨ to auto-generate
3. **Fine-tune**: Manually adjust relationships, cycle types with 🔄
4. **Tune Loudness**: Adjust sliders to control voice frequency
5. **Save Profiles**: Save your setup before major story events

## Credits

Inspired by:
- **Slay the Princess** - The voice system and emergence mechanic
- **Disco Elysium** - Skills as internal voices with personalities

Created by the bad bitch Sinnerconsort for SillyTavern. Because I'd rather create extensions than actually RP now. Someone please stop me— or give me suggestions.

---

*"There are so many of us now. There isn't supposed to be this many."*
