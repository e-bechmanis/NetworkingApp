using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, 
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsProfilePhoto).Url))
                .ForMember(dest => dest.IsMentor, 
                    opt => opt.MapFrom(src => src.Stack.FirstOrDefault(x => x.CanMentor).CanMentor));
            CreateMap<Photo, PhotoDto>();
            CreateMap<Stack, StackDto>();
            CreateMap<MemberUpdateDto, AppUser>();
        }
    }
}