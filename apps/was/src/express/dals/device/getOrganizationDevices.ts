import { Device, Group, Organization } from '@db/models';

export default async function getOrganizationDevices(orgId: string): Promise<Device[]> {
    const devices = await Device.findAll({
        include: [
            {
                model: Organization,
                where: {id: orgId},
                
            },  
            {
                model: Group,
                include: [
                    {
                        model: Organization,
                        where: {id: orgId}
                    }

                ]                
            }          
        ]
    });
    
    return devices;
}