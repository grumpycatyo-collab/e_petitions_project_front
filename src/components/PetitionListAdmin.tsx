import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useToast, Text, Button, Card, CardBody, HStack, Input, Heading, Select, Box, Divider} from '@chakra-ui/react';
import {petitions} from "../api";
import {users} from "../api";

interface Props {
    petition: {
        petition_id: number;
        title: string;
        description: string;
        date: string;
        status:string;
        created_at:string;
        user_id: string;
    };

}

interface User {
    email: string;
}
export const PetitionDetail: React.FC<Props> = ({petition}) => {
    const [selectedValue, setSelectedValue] = useState('publish');
    const toast = useToast();
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };

    const onApprove = async (id: number, status: string) => {
        try {
            const body = {
                id: id,
                status: status === 'publish' ? 'PUBLIC' : 'DRAFT',
            };

            const result = await petitions.changeStatus(body);
            console.log("PUB:",body);
            console.log('Status changed successfully:', result);
            toast({
                title: 'Response Successfully Sent',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

        } catch (error) {
            console.error('Error changing status:', error);
        }
    };


    const [userInfo, setUserInfo] = useState<User | null>(null);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const user = await users.getUserById(petition.user_id);

                setUserInfo(user);
            } catch (error) {
                console.error('Error fetching author info:', error);
            }
        };

        fetchUserInfo();

    }, [petition.user_id]);

    return (
        <>
            {/* First Card */}
            <Card  boxShadow="none">
                <CardBody>
                    <Heading fontSize="2xl" fontWeight="bold" mb={2}>
                        {petition.title}
                    </Heading>
                    <HStack spacing='20px'>
                        <Text fontSize="md" color='gray.500' mb={2}>
                            ID: {petition.user_id && (
                            <Box as="span" color="black">
                                {petition.user_id}
                            </Box>
                        )}
                        </Text>
                        <Text fontSize="md" color='gray.500' mb={2}>
                            Author's Email: {userInfo && (
                            <Box as="span" color="black">
                                {userInfo.email}
                            </Box>
                        )}
                        </Text>
                    </HStack>
                </CardBody>
            </Card>

            {/* Divider */}
            <Divider />

            {/* Second Card */}
            <Card bg="white" borderRadius="md" boxShadow="none">
                <CardBody>
                            <Card boxShadow="none" mb={4}>
                            <Text size='md' color='gray.500' mb={2}>Description:</Text>
                    <Text> {petition.description}</Text>
                            </Card>
                    <Select mb={2} placeholder='What do you think?' value={selectedValue} onChange={handleSelectChange}>
                        <option value='publish'>Publish</option>
                        <option value='disapprove'>Send to user's drafts</option>
                    </Select>
                    <Button  bgColor="blackAlpha.800" _hover={{ bgColor: "gray.500" }} size="md" mt={2} color="white" fontWeight="normal" rounded="full"  onClick={() => onApprove(petition.petition_id, selectedValue)}>
                        Send response
                    </Button>
                </CardBody>
                <CardBody mt={4}>
                    <Text fontSize="lg"  mb={2}>
                        Comments:
                    </Text>
                    <Input
                        placeholder="Write your comment here..."
                        variant="outline"
                        size="md"
                        mt={2}
                    />
                    <Button bgColor="blackAlpha.800"  _hover={{ bgColor: "gray.500" }} size="md" mt={2} color="white" fontWeight="normal" rounded="full">
                        Post Comment
                    </Button>
                </CardBody>
            </Card>
        </>
    );

};

export default PetitionDetail;
