pragma solidity ^0.4.17;


contract FoodSafe
{ 

    struct Location{
        string Name;
        uint LocationId;
        uint PreviousLocationId;
        uint Timestamp;
        string Secret;
    }
    mapping(uint => Location) Trail;
    uint8 TrailCount = 0;
  

    function AddNewLocation(uint LocationId, string Name, string Secret)
    {
        Location memory newLocation;
        newLocation.Name = Name;
        newLocation.LocationId= LocationId;
        newLocation.Secret = Secret;
        newLocation.Timestamp = now;
        if (TrailCount != 0)
        {
            newLocation.PreviousLocationId = Trail[TrailCount - 1].LocationId;
        }
        Trail[TrailCount] = newLocation;
        TrailCount++;
    }


    function GetTrailCount() returns(uint8) {
        return TrailCount;
    }

    function GetLocation(uint8 TrailNo) returns(string, uint, uint, uint, string) {
        return (Trail[TrailNo].Name, Trail[TrailNo].LocationId, Trail[TrailNo].PreviousLocationId, Trail[TrailNo].Timestamp,Trail[TrailNo].Secret);
    }
    function GetAllLocations() {
       
    }
    
}