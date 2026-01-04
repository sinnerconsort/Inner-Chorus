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

### 💔 Voice Relationships
- **Tension** - voices that argue and contradict each other
- **Alliance** - voices that support and agree
- **AI-generated** or **user-customized** dynamics
- Relationships influence how voices interact in the chorus
- Click the ❤️‍🔥 button to auto-generate relationships

### 🧠 Generate from Persona
- Scan your **persona description** and **lorebook**
- AI creates a **custom voice set** tailored to your character's psychology
- Choose how many voices (3/5/7)
- Choose starting state (all dormant, narrator only, core voices, all active)

### 🔮 Context-Aware Spawning
- AI analyzes **who your character is** and **how they react**
- Same event → different characters → different (or no) voices
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

## Configuration

### API Settings
- **Endpoint**: Your LLM API endpoint (OpenAI-compatible)
- **API Key**: Your API key
- **Model**: Model to use for voice generation

### Trigger Settings
- **Auto-trigger**: Automatically generate chorus after AI messages
- **Trigger Delay**: Wait time for streaming to complete
- **Auto-spawn**: Basic keyword-based voice spawning
- **Context-aware spawning**: AI analyzes persona + context (extra API calls)

## Voice Badges

| Badge | Meaning |
|-------|---------|
| **Always** | Voice is always present (like Narrator) |
| **Core** | Central personality voice |
| **Persona** | Generated from persona analysis |
| **Story** | Spawned from story events |

## Relationship Types

| Type | Icon | Meaning |
|------|------|---------|
| **Tension** | ⚡ | Voices argue, contradict, oppose |
| **Alliance** | 🤝 | Voices support, agree, reinforce |

## Workflow Tips

1. **Start Fresh**: Use "Generate from Persona" for a custom voice set
2. **Add Relationships**: Click ❤️‍🔥 to generate voice dynamics
3. **Tune Loudness**: Adjust sliders to control voice frequency
4. **Organic Growth**: Set voices to dormant, let them awaken naturally  
5. **Save Profiles**: Save your setup before major story events

## Credits

Inspired by:
- **Slay the Princess** - The voice system and emergence mechanic
- **Disco Elysium** - Skills as internal voices with personalities

Created by Judas for SillyTavern.

---

*"There are so many of us now. There isn't supposed to be this many."*
