import React, { FunctionComponent } from 'react'
import {Transaction} from '_models'
import { DateTime } from 'luxon'

import {Pressable, Text, Box, HStack, VStack, Center} from 'native-base'

export interface Props{
    transaction: Transaction;
    onTransactionEdit: (transaction: Transaction) => void;
}

const TransactionLine: FunctionComponent<Props> = ({transaction, onTransactionEdit}: Props) => {
    return (
        <Pressable w="100%" mb={0.4} onLongPress={()=>onTransactionEdit(transaction)}>
            <Box w="100%" h={105} borderColor="gray.200" borderWidth={2} rounded="md" _text={{color: "white",}} p={2}>
                <HStack w="100%" h="100%">
                    <VStack w="100%"  h="100%" size="3" space={2}>
                        <HStack space={2}>
                            <Box pt={2} pl={1} pr={3} w="70%">
                                <Text bold fontSize="2xl">{transaction.item}</Text>
                            </Box>
                            <Box pt={2} pr={3} w="30%">
                                <Text fontSize="2xl" textAlign={[ 'right', 'center' ]}>${transaction.amount}</Text>
                            </Box>
                        </HStack>
                        <HStack space={2}>
                            <Box pl={1} pr={3} pb={2} w="67%">
                                <Text color="gray.400">{transaction.source}</Text>
                            </Box>
                            <Box px={3} pb={2} w="33%">
                                <Text textAlign={[ 'right', 'center' ]} color="gray.400">{DateTime.fromMillis(transaction.transactionDate).setLocale('hk').toFormat("yyyy-MM-dd")}</Text>
                            </Box>
                        </HStack>
                    </VStack>
                </HStack>
            </Box>
        </Pressable>
    )
}

export default TransactionLine
