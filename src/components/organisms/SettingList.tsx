import React, {FunctionComponent} from 'react'
import {VStack, Box} from 'native-base'
import { GoogleSigninLine } from 'components/molecules'


const SettingList: FunctionComponent = () => {

    return(
        <>
            <VStack space={4} w="100%">
                <Box h="100%">
                    <GoogleSigninLine />
                </Box>
            </VStack>
        </>
    )
}

export default SettingList;
