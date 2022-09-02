const CHUNK_CHARACTERS_MAX = 50
const INDICATORS_PART_LENGTH = 4 // 1/1 with spaces that is total of 4
const CHUNK_CHAR_ALLOW = 30

export const splitMessage = (input) => {
    if (input.length <= CHUNK_CHARACTERS_MAX) return [input]

    let chunkCharInPiece = CHUNK_CHARACTERS_MAX - INDICATORS_PART_LENGTH // 46

    let res = [input]
    let isFirstChunk = true
    while (
        res.find(item => item.length > CHUNK_CHARACTERS_MAX) &&
        chunkCharInPiece > CHUNK_CHAR_ALLOW
    ) {
        if (!isFirstChunk) {
            chunkCharInPiece--
        }
        isFirstChunk = false
        let chunks = chunkString(input, chunkCharInPiece)
        //add Indicator To Chunks
        let total = chunks.length
        res = chunks.map((item, index) => {
            return index + 1 + '/' + total + ' ' + item
        })
    }

    return res
}

export const chunkString = (str, size) => {

    let chunks = []
    let spacePieces = str.split(' ')
    return spacePieces.reduce(
        function (chunks, piece, index) {
            let isFirstPiece = index === 0

            let chunkSeparator = isFirstPiece ? '' : ' '
            let currentChunk = chunks[chunks.length - 1]

            // If a piece is longer than size then split that piece.
            if (piece.length > size) {
                // Add whatever we can to the current
                let startingPieceIndex = size - (chunkSeparator + currentChunk).length
                currentChunk += chunkSeparator + piece.substring(0, startingPieceIndex)
                chunks[chunks.length - 1] = currentChunk

                // Then just add the rest to more chunks
                let leftover = piece.substring(startingPieceIndex)
                for (let i = 0; i < leftover.length; i += size) {
                    chunks.push(leftover.substring(i, i + size))
                }
            }

            // Otherwise try to split nicely at spaces
            else if ((currentChunk + chunkSeparator + piece).length <= size) {
                currentChunk += chunkSeparator + piece
                chunks[chunks.length - 1] = currentChunk
            }

            // If we simply reached max for this chunk, move to the next one
            else {
                currentChunk = piece
                chunks.push('')
                chunks[chunks.length - 1] = currentChunk
            }

            return chunks
        },
        ['']
    )
}