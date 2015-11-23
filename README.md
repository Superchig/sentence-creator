# Sentence Creator
This takes words and a pattern and makes them into sentences.

So far, this only (partially) works with Esperanto.

## Example

Common Nouns:

```
flago
knabo
viro
```
Subject Pronouns:

```
mi
vi
```
Transitive Verbs:

```
havi
preni
```

Sentence Patterns:

```
SUBJECT_PRONOUN TRANS_VERB COMMON_NOUN
SUBJECT_PRONOUN TRANS_VERB PLURAL_COMMON_NOUN
COMMON_NOUN TRANS_VERB COMMON_NOUN
La COMMON_NOUN TRANS_VERB COMMON_NOUN
```

Possible Output:

```
Mi havas flagon.
Vi havas flagojn.
Knabo havas potato.
```
